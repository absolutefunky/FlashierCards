using FlashierCards.Api.Dtos;
using FlashierCards.Api.Models;

namespace FlashierCards.Api.Endpoints;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this WebApplication app)
    {
        // GET /users/id
        app.MapGet("/users/{id}", async (int id, Supabase.Client supabase) =>
        {
            var response = await supabase
                .From<User>()
                .Where(u => u.Id == id)
                .Get();

            var user = response.Models.FirstOrDefault();

            if (user is null)
            {
                return Results.NotFound();
            }

            var userDto = new UserDto(
                user.Id,
                user.Username!,
                user.PasswordHash!,
                user.Email!,
                user.DateAccountCreated
            );

            return Results.Ok(userDto);
        });

        // POST /users
        app.MapPost("/users", async (CreateUserDto request, Supabase.Client supabase) =>
        {
            var user = new User
            {
                Username = request.Username,
                PasswordHash = request.PasswordHash,
                Email = request.Email,
                DateAccountCreated = DateOnly.FromDateTime(DateTime.UtcNow)
            };

            var response = await supabase
                .From<User>()
                .Insert(user);

            var created = response.Models.FirstOrDefault();

            if (created is null)
            {
                return Results.BadRequest();
            }

            var userDto = new UserDto(
                created.Id,
                created.Username!,
                created.PasswordHash!,
                created.Email!,
                created.DateAccountCreated
            );

            return Results.Created($"/users/{created.Id}", userDto);
        });

        // PUT /users/id
        app.MapPut("/users/{id}", async (int id, UpdateUserDto request, Supabase.Client supabase) =>
        {
            var response = await supabase
                .From<User>()
                .Where(u => u.Id == id)
                .Set(u => u.PasswordHash!, request.PasswordHash)
                .Update();

            var user = response.Models.FirstOrDefault();

            if (user is null)
            {
                return Results.NotFound();
            }

            var userDto = new UserDto(
                user.Id,
                user.Username!,
                user.PasswordHash!,
                user.Email!,
                user.DateAccountCreated
            );

            return Results.Ok(userDto);
        });

        // DELETE /users/id
        app.MapDelete("/users/{id}", async (int id, Supabase.Client supabase) =>
        {
            await supabase
                .From<User>()
                .Where(u => u.Id == id)
                .Delete();

            return Results.NoContent();
        });
    }
}
