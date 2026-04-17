using FlashierCards.Api.Dtos.ReturnDtos;
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
            var userDto = new ReturnUserDto
            (
                user.Id,
                user.Email!,
                user.DateAccountCreated
            );

            return Results.Ok(userDto);
        });

        // GET /users/{id} 
        // use ReturnuserDto crecord to return data

        //  POST /users/signup to create a new user
        // use CreateUserDto record for request data
        // use ReturnUserDto record to return data
        // create password hash before inserting data into db

        // POST /users/login to authenticate user
        // use VerifyLoginDto record for request data
        // use ReturnUserDto record to get and return data

        // POST /users/forgotPassword to authenticate user
        // use VerifyForgotPasswordDto record for request data
        // just return Request.ok or something else depending on status

        // PUT /users/updatePassword
        // use UpdateUserDto record for request data
        // use ReturnUserDto record to get and return data 
        // create password hash before updating data into db

        // DELETE /users/{id} 
        // return request.ok or something else depending on status
    }
}
