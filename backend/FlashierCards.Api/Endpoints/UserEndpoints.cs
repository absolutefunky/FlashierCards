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
                return Results.BadRequest(new { message = "User does not exist." });
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
                return Results.BadRequest(new { message = "Please properly complete the form." });
            }

            // implement password critera

            // check if passwords match
            if (newUser.Password != newUser.ConfirmPassword)
            {
                return Results.BadRequest(new { message = "Password and Confirm password do not match." });
            }

            var existingUser = await supabase
                .From<User>()
                .Where(u => u.Email == newUser.Email)
                .Get();

            // check if user already exists
            if (existingUser.Models.Any())
            {
                return Results.BadRequest(new { message = "User with this email already has an account. Please login instead." });
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
                return Results.BadRequest(new { message = "Invalid request. User account could not be created." });
            }

            var userDto = new ReturnUserDto(
                insertedUser.Id,
                insertedUser.Email!,
                insertedUser.DateAccountCreated
            );

            return Results.Ok(new
            {
                message = "User account was successfully created.",
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
                return Results.BadRequest(new { message = "Please properly complete the form." });
            }

            // check if user exists
            var response = await supabase
                .From<User>()
                .Where(u => u.Email == loginUser.Email)
                .Get();

            var user = response.Models.FirstOrDefault();

            if (user is null)
            {
                return Results.BadRequest(new { message = "Invalid email. User does not exist." });
            }

            // check if password match
            bool samePassword = BCrypt.Net.BCrypt.Verify(loginUser.Password, user.PasswordHash);

            if (!samePassword)
            {
                return Results.BadRequest(new { message = "Invalid password. Please enter the correct password." });
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
                return Results.BadRequest(new { message = "Please properly complete the form." });
            }

            // implement password critera here

            // check if passwords match
            if (passwordDto.NewPassword != passwordDto.ConfirmNewPassword)
            {
                return Results.BadRequest(new { message = "New password and Confirm new password do not match." });
            }

            // check if current password is real
            var response = await supabase
                .From<User>()
                .Where(u => u.Id == id)
                .Get();

            var user = response.Models.FirstOrDefault();

            if (user is null)
            {
                return Results.BadRequest(new { message = "Invalid current password." });
            }

            bool sameNewPasswords = BCrypt.Net.BCrypt.Verify(passwordDto.CurrentPassword, user.PasswordHash);

            if (!sameNewPasswords)
            {
                return Results.BadRequest(new { message = "Please choose a different password." });
            }

            // change password
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(passwordDto.NewPassword);
            await user.Update<User>();

            return Results.Ok(new { message = "Password was successfully changed." });
        });

        // POST /users/forgotPassword to authenticate user when they forget password
        app.MapPost("/users/forgotPassword", async (VerifyForgotPasswordDto forgetfulUser, Supabase.Client supabase) =>
        {
            // check if an input field is empty
            if (string.IsNullOrWhiteSpace(forgetfulUser.Email) ||
                string.IsNullOrWhiteSpace(forgetfulUser.SqAnswer))
            {
                return Results.BadRequest(new { message = "Please properly complete the form." });
            }

            // check if user exists
             var response = await supabase
                .From<User>()
                .Where(u => u.Email == forgetfulUser.Email)
                .Get();

            var user = response.Models.FirstOrDefault();

            if (user is null)
            {
                return Results.BadRequest(new { message = "Invalid email. User does not exist." });
            }

            var submittedAnswer = forgetfulUser.SqAnswer.Trim().ToLower();
            var savedAnswer = user.SqAnswer?.Trim().ToLower();

            // check if security question answer match
            if (submittedAnswer != savedAnswer)
            {
                return Results.BadRequest(new { message = "Invalid request. Please enter the correct name." });
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

        // PUT /users/createNewPassword when user forgot password
        app.MapPut("/users/{id}/createNewPassword", async (int id, UpdateUserDto passwordDto, Supabase.Client supabase) =>
        {
            // check if an input field is empty
            if (string.IsNullOrWhiteSpace(passwordDto.NewPassword) ||
                string.IsNullOrWhiteSpace(passwordDto.ConfirmNewPassword))
            {
                return Results.BadRequest(new { message = "Please properly complete the form." });
            }

            // implement password criteria here

            // check if passwords match
            if (passwordDto.NewPassword != passwordDto.ConfirmNewPassword)
            {
                return Results.BadRequest(new { message = "Password and Confirm password do not match." });
            }

            // get user to create new password
            var response = await supabase
                .From<User>()
                .Where(u => u.Id == id)
                .Get();

            var user = response.Models.FirstOrDefault();

            if (user is null)
            {
                return Results.NotFound(new { message = "Invalid request. User does not exist." });
            }

            // check if new password same as old password
            bool sameNewPasswords = BCrypt.Net.BCrypt.Verify(passwordDto.NewPassword, user.PasswordHash);

            if (sameNewPasswords)
            {
                return Results.BadRequest(new { message = "Invalid request. Please choose a different password." });
            }

            // create new password for forgetful user
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(passwordDto.NewPassword);
            await user.Update<User>();

            return Results.Ok(new { message = "Password was successfully created." });
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
                return Results.BadRequest(new { message = "User does not exist." });
            }

            await supabase
                .From<User>()
                .Where(u => u.Id == id)
                .Delete();

            return Results.Ok(new { message = "Bye bye... :(" });
        });
    }
}