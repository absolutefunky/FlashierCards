using FlashierCards.Api.Dtos.CreateDtos;
using FlashierCards.Api.Dtos.ReturnDtos;
using FlashierCards.Api.Dtos.VerifyDtos;
using FlashierCards.Api.Models;

namespace FlashierCards.Api.Endpoints;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this WebApplication app)
    {
        // GET /users/{id}
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
                user.AuthId!,
                user.Username!,
                user.Email!,
                user.CreatedAt
            );

            return Results.Ok(userDto);
        });

        //  POST /users/register
        app.MapPost("/users/register", async (CreateUserDto newUser, Supabase.Client supabase) =>
        {
            var userToInsert = new User
            {
                AuthId = newUser.AuthId,
                Username = newUser.Username,
                Email = newUser.Email,
                SqAnswer = newUser.SqAnswer
            };

            var insertResponse = await supabase
                .From<User>()
                .Insert(userToInsert);

            var insertedUser = insertResponse.Models.FirstOrDefault();

            if (insertedUser is null)
            {
                return Results.BadRequest(new { message = "ACCOUNT COULD NOT BE CREATED" });
            }

            var userDto = new ReturnUserDto
            (
                insertedUser.Id,
                insertedUser.AuthId!,
                insertedUser.Username!,
                insertedUser.Email!,
                insertedUser.CreatedAt
            );

            return Results.Ok(userDto);
        });

        // POST /users/{id}/forgotPassword
        app.MapPost("/users/forgotPassword", async (VerifyUserDto verifyRequest, Supabase.Client supabase) =>
        {
            var response = await supabase
                .From<User>()
                .Where(u => u.Email == verifyRequest.Email)
                .Where(u => u.SqAnswer == verifyRequest.SqAnswer)
                .Get();

            var user = response.Models.FirstOrDefault();

            if (user is null)
            {
                return Results.NotFound(new { message = "USER NOT FOUND." });
            }

            var userDto = new ReturnUserDto
            (
                user.Id,
                user.AuthId!,
                user.Username!,
                user.Email!,
                user.CreatedAt
            );

            return Results.Ok(userDto);
        });

        // DELETE /users/{id}/delete
        app.MapDelete("/users/{id}/delete", async(int id, Supabase.Client supabase) =>
        {
            await supabase
                .From<User>()
                .Where(u => u.Id == id)
                .Delete();

            var response = await supabase
                .From<User>()
                .Where(u => u.Id == id)
                .Get();

            var user = response.Models.FirstOrDefault();

            if (user is null)
            {
                return Results.Ok(new { message = "Bye bye... :(" });
            }

            return Results.NotFound(new { message = "USER NOT FOUND" });          
        });
    }
}
