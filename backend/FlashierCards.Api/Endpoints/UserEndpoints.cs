using FlashierCards.Api.Dtos;
using FlashierCards.Api.Models;

namespace FlashierCards.Api.Endpoints;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this WebApplication app)
    {
        // GET /users/id
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
            var userDto = new UserDto
            (
                user.Id,
                user.Username!,
                user.PasswordHash!,
                user.Email!,
                user.DateAccountCreated
            );

            return Results.Ok(userDto);
        });

        // POST /users
        

        // PUT /users/id
        

        // DELETE /users/id
        
    }
}
