using FlashierCards.Api.Dtos.ReturnDtos;
using FlashierCards.Api.Dtos.UpdateDtos;
using FlashierCards.Api.Models;
using FlashierCards.Api.Dtos.CreateDtos;
using FlashierCards.Api.Dtos.VerifyDtos;

namespace FlashierCards.Api.Endpoints;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this WebApplication app)
    {
        // GET /users/{id} to get user data
        app.MapGet("/users/{id}", async(int id, Supabase.Client supabase) =>
        {
            // find user who has the given id
            var response = await supabase
                .From<User>()
                .Where(u => u.Id == id)
                .Get();
            
            var user = response.Models.FirstOrDefault();

            if (user is null)
            {
                return Results.NotFound();
            }

            // create a user record to return
            var userDto = new ReturnUserDto
            (
                user.Id,
                user.Email!,
                user.DateAccountCreated
            );

            return Results.Ok(userDto);
        });

        // GET /users/register to create new user
        app.MapPost("/users/register", async (CreateUserDto newUser, Supabase.Client supabase) =>
        {
            // check if an input field is empty
            if (string.IsNullOrWhiteSpace(newUser.Email) ||
                string.IsNullOrWhiteSpace(newUser.Password) ||
                string.IsNullOrWhiteSpace(newUser.ConfirmPassword) ||
                string.IsNullOrWhiteSpace(newUser.SqAnswer))
            {
                return Results.BadRequest(new { message = "NO INCOMPLETE FIELDS ALLOWED" });
            }

            // check if passwords match
            if (newUser.Password != newUser.ConfirmPassword)
            {
                return Results.BadRequest(new { message = "PASSWORDS DO NOT MATCH" });
            }

            var existingUser = await supabase
                .From<User>()
                .Where(u => u.Email == newUser.Email)
                .Get();

            // check if user already exists
            if (existingUser.Models.Any())
            {
                return Results.BadRequest(new { message = "THIS EMAIL IS CURRENTLY BEING USED BY A PREVIOUS ACCOUNT" });
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(newUser.Password);

            var userToInsert = new User
            {
                Email = newUser.Email,
                PasswordHash = hashedPassword,
                SqAnswer = newUser.SqAnswer,
                DateAccountCreated = DateOnly.FromDateTime(DateTime.UtcNow)
            };

            // insert the user
            var insertResponse = await supabase
                .From<User>()
                .Insert(userToInsert);

            var insertedUser = insertResponse.Models.FirstOrDefault();

            if (insertedUser is null)
            {
                return Results.BadRequest(new { message = "ACCOUNT COULD NOT BE CREATED" });
            }

            var userDto = new ReturnUserDto(
                insertedUser.Id,
                insertedUser.Email!,
                insertedUser.DateAccountCreated
            );

            return Results.Ok(new
            {
                message = "ACCOUNT SUCCESSFULLY CREATED",
                user = userDto
            });
        });

        // POST /users/login to verify user for login
        app.MapPost("/users/login", async (VerifyLoginDto loginUser, Supabase.Client supabase) =>
        {
            // check if an input field is empty
            if (string.IsNullOrWhiteSpace(loginUser.Email) ||
                string.IsNullOrWhiteSpace(loginUser.Password))
            {
                return Results.BadRequest(new { message = "A FIELD IS MISSING..." });
            }

            // check if user exists
            var response = await supabase
                .From<User>()
                .Where(u => u.Email == loginUser.Email)
                .Get();

            var user = response.Models.FirstOrDefault();

            if (user is null)
            {
                return Results.Unauthorized();
            }

            // check if password match
            bool samePassword = BCrypt.Net.BCrypt.Verify(loginUser.Password, user.PasswordHash);

            if (!samePassword)
            {
                return Results.Unauthorized();
            }

            var userDto = new ReturnUserDto(
                user.Id,
                user.Email!,
                user.DateAccountCreated
            );

            return Results.Ok(new
            {
                user = userDto
            });
        });

        // PUT /users/{id}/changePassword when user is logged in
        app.MapPut("/users/{id}/changePassword", async (int id, UpdateUserDto passwordDto, Supabase.Client supabase) =>
        {
            // check if an input field is empty
            if (string.IsNullOrWhiteSpace(passwordDto.CurrentPassword) ||
                string.IsNullOrWhiteSpace(passwordDto.NewPassword) ||
                string.IsNullOrWhiteSpace(passwordDto.ConfirmNewPassword))
            {
                return Results.BadRequest(new { message = "FIELDS ARE INCOMPLETE" });
            }

            // check if passwords match
            if (passwordDto.NewPassword != passwordDto.ConfirmNewPassword)
            {
                return Results.BadRequest(new { message = "PASSWORDS DO NOT MATCH" });
            }

            // check if current password is real
            var response = await supabase
                .From<User>()
                .Where(u => u.Id == id)
                .Get();

            var user = response.Models.FirstOrDefault();

            if (user is null)
            {
                return Results.NotFound(new { message = "USER NOT FOUND." });
            }

            bool sameNewPasswords = BCrypt.Net.BCrypt.Verify(passwordDto.CurrentPassword, user.PasswordHash);

            if (!sameNewPasswords)
            {
                return Results.BadRequest(new { message = "CURRENT PASSWORD INCORRECT" });
            }

            // change password
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(passwordDto.NewPassword);
            await user.Update<User>();

            return Results.Ok(new { message = "PASSWORD SUCCESSFULLY UPDATED." });
        });

        // POST /users/forgotPassword to authenticate user when they forget password
        app.MapPost("/users/forgotPassword", async (VerifyForgotPasswordDto forgetfulUser, Supabase.Client supabase) =>
        {
            // check if an input field is empty
            if (string.IsNullOrWhiteSpace(forgetfulUser.Email) ||
                string.IsNullOrWhiteSpace(forgetfulUser.SqAnswer))
            {
                return Results.BadRequest(new { message = "A FIELD IS MISSING..." });
            }

            // check if user exists
             var response = await supabase
                .From<User>()
                .Where(u => u.Email == forgetfulUser.Email)
                .Get();

            var user = response.Models.FirstOrDefault();

            if (user is null)
            {
                return Results.NotFound(new { message = "USER NOT FOUND." });
            }

            var submittedAnswer = forgetfulUser.SqAnswer.Trim().ToLower();
            var savedAnswer = user.SqAnswer?.Trim().ToLower();

            // check if security question answer match
            if (submittedAnswer != savedAnswer)
            {
                return Results.BadRequest(new { message = "ANSWER INCORRECT." });
            }

            var userDto = new ReturnUserDto(
                user.Id,
                user.Email!,
                user.DateAccountCreated
            );

            return Results.Ok(new
            {
                user = userDto
            });
        });

        // PUT /users/updatePassword when user forgot password
        app.MapPut("/users/updatePassword", async (UpdateUserDto passwordDto, Supabase.Client supabase) =>
        {
            // check if an input field is empty
            if (string.IsNullOrWhiteSpace(passwordDto.Email) ||
                string.IsNullOrWhiteSpace(passwordDto.NewPassword) ||
                string.IsNullOrWhiteSpace(passwordDto.ConfirmNewPassword))
            {
                return Results.BadRequest(new { message = "FIELDS ARE INCOMPLETE" });
            }

            // check if passwords match
            if (passwordDto.NewPassword != passwordDto.ConfirmNewPassword)
            {
                return Results.BadRequest(new { message = "PASSWORDS DO NOT MATCH" });
            }

            // get user to create new password
            var response = await supabase
                .From<User>()
                .Where(u => u.Email == passwordDto.Email)
                .Get();

            var user = response.Models.FirstOrDefault();

            if (user is null)
            {
                return Results.NotFound(new { message = "USER NOT FOUND." });
            }

            // check if new password same as old password
            bool sameNewPasswords = BCrypt.Net.BCrypt.Verify(passwordDto.NewPassword, user.PasswordHash);

            if (sameNewPasswords)
            {
                return Results.BadRequest(new { message = "NEW PASSWORD MATCHES OLD PASSWORD" });
            }

            // create new password for forgetful user
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(passwordDto.NewPassword);
            await user.Update<User>();

            return Results.Ok(new { message = "PASSWORD SUCCESSFULLY CREATED." });
        });

        // DELETE /users/{id}/delete
        app.MapDelete("/users/{id}/delete", async (int id, Supabase.Client supabase) =>
        {
            // check if user exists
            var response = await supabase
                .From<User>()
                .Where(u => u.Id == id)
                .Get();

            var user = response.Models.FirstOrDefault();

            if (user is null)
            {
                return Results.NotFound(new { message = "USER NOT FOUND" });
            }

            await supabase
                .From<User>()
                .Where(u => u.Id == id)
                .Delete();

            return Results.Ok(new { message = "Bye bye... :(" });
        });
    }
}