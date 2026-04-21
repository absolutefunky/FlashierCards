using FlashierCards.Api.Dtos.CreateDtos;
using FlashierCards.Api.Dtos.ReturnDtos;
using FlashierCards.Api.Dtos.UpdateDtos;
using FlashierCards.Api.Models;

namespace FlashierCards.Api.Endpoints;

public static class ProfileEndpoints
{
    public static void MapProfileEndpoints(this WebApplication app)
    {
        // GET /users/{id}/profiles to get user profile information
        app.MapGet("/users/{id}/profiles", async(int id, Supabase.Client supabase) =>
        {
            // find user profile with given id
            var response = await supabase
                .From<Profile>()
                .Where(p => p.UserId == id)
                .Get();
            
            var profile = response.Models.FirstOrDefault();

            if (profile is null)
            {
                return Results.NotFound(new { message = "USER PROFILE NOT FOUND"});
            }

            // create a profile record to return
            var profileDto = new ReturnProfileDto
            (
                profile.Id,
                profile.UserId,
                profile.AnimationType!
            );

            return Results.Ok(profileDto);
        });

        // POST /users/{id}/profiles/create
        app.MapPost("/users/{id}/profiles/create", async(int id, CreateProfileDto request, Supabase.Client supabase) =>
        {
            // check if user id violates foreign key property
            var userResponse = await supabase
                .From<User>()
                .Where(u => u.Id == id)
                .Get();

            var user = userResponse.Models.FirstOrDefault();

            if (user is null)
            {
                return Results.NotFound(new { message = "User does not exist." });
            }

            // check if user profile already exist
            var profileResponse = await supabase
                .From<Profile>()
                .Where(p => p.UserId == id)
                .Get();

            var userProfile = profileResponse.Models.FirstOrDefault();

            if (userProfile is not null)
            {
                return Results.BadRequest(new { message = "User already has a profile." });
            }

            var profile = new Profile
            {
                UserId = id,
                BackgroundColor = request.BackgroundColor,
                AnimationType = request.AnimationType
            };

            // insert profile into database
            var newResponse = await supabase
                .From<Profile>()
                .Insert(profile);

            profile = newResponse.Models.FirstOrDefault();

            if (profile is null)
            {
                return Results.BadRequest(new { message = "Invalid request. User profile was not created." });
            }

            // create a profile record to return
            var profileDto = new ReturnProfileDto
            (
                profile.Id,
                profile.UserId,
                profile.AnimationType!
            );

            return Results.Ok(profileDto);
        });

        // PUT /users/{id}/profiles
        app.MapPut("/users/{userId}/profiles/{id}/update", async(int userId, int id, UpdateProfileDto request, Supabase.Client supabase) =>
        {
            // check if an input field is empty
            if (string.IsNullOrWhiteSpace(request.AnimationType))
            {
                return Results.BadRequest(new { message = "FIELDS ARE INCOMPLETE" });
            }

            // update animation type in profile table
            var response = await supabase
                .From<Profile>()
                .Where(p => p.UserId == userId && p.Id == id)
                .Set(p => p.AnimationType!, request.AnimationType)
                .Update();

            var profile = response.Models.FirstOrDefault();

            if (profile is null)
            {
                return Results.NotFound(new { message = "USER PROFILE NOT UPDATED" });
            }

            // create a profile record to return
            var profileDto = new ReturnProfileDto
            (
                profile.Id,
                profile.UserId,
                profile.AnimationType!
            );

            return Results.Ok(profileDto);
        });
    }
}