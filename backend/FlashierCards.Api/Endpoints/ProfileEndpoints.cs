using FlashierCards.Api.Dtos;
using FlashierCards.Api.Models;

namespace FlashierCards.Api.Endpoints;

public static class ProfileEndpoints
{
    public static void MapProfileEndpoints(this WebApplication app)
    {
        // GET /users/id/profiles
        app.MapGet("/users/{id}/profiles", async(int id, Supabase.Client supabase) =>
        {
            // find user who has the given id
            var response = await supabase
                .From<Profile>()
                .Where(p => p.UserId == id)
                .Get();
            
            var profile = response.Models.FirstOrDefault();

            if (profile is null)
            {
                return Results.NotFound();
            }

            // create a profile record to return
            var profileDto = new ProfileDto
            (
                profile.Id,
                profile.UserId,
                profile.AnimationType
            );

            return Results.Ok(profileDto);
        });

        // POST /users/id/profiles
        app.MapPost("/users/{id}/profiles", async(int id, CreateProfileDto request, Supabase.Client supabase) =>
        {
            // find user who has the given id
            var response = await supabase
                .From<Profile>()
                .Where(p => p.UserId == id)
                .Get();

            var user = response.Models.FirstOrDefault();

            // create profile if user doesn't have one
            if (user is null)
            {
                var profile = new Profile
                {
                    UserId = request.UserId,
                    AnimationType = request.AnimationType
                };

                // insert profile into database
                var newResponse = await supabase
                    .From<Profile>()
                    .Insert(profile);

                profile = newResponse.Models.FirstOrDefault();

                if (profile is null)
                {
                    return Results.NotFound();
                }

                // create a profile record to return
                var profileDto = new ProfileDto
                (
                    profile.Id,
                    profile.UserId,
                    profile.AnimationType
                );

                return Results.Ok(profileDto);            
            }
            return Results.NotFound();
        });

        // PUT /users/id/profiles
        app.MapPut("/users/{id}/profiles", async(int id, UpdateProfileDto request, Supabase.Client supabase) =>
        {
            var profile = new Profile
            {
                AnimationType = request.AnimationType
            };

           // update password hash in user table
            var response = await supabase
                .From<Profile>()
                .Where(p => p.UserId == id)
                .Set(p => p.BackgroundColor!, profile.BackgroundColor)
                .Set(p => p.AnimationType!, profile.AnimationType)
                .Update();

            profile = response.Models.FirstOrDefault();

            if (profile is null)
            {
                return Results.NotFound();
            }

            // create a user record to return
            var profileDto = new ProfileDto
            (
                profile.Id,
                profile.UserId,
                profile.AnimationType
            );

            return Results.Ok(profileDto);
        });
    }
}
