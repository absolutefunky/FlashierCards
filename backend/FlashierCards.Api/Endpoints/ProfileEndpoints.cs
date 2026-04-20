using FlashierCards.Api.Dtos.CreateDtos;
using FlashierCards.Api.Dtos.ReturnDtos;
using FlashierCards.Api.Dtos.UpdateDtos;
using FlashierCards.Api.Models;

namespace FlashierCards.Api.Endpoints;

public static class ProfileEndpoints
{
    public static void MapProfileEndpoints(this WebApplication app)
    {
        // GET /users/{id}/profiles
        app.MapGet("/users/{id}/profiles", async(string id, Supabase.Client supabase) =>
        {
            // find user profile with given id
            var response = await supabase
                .From<Profile>()
                .Where(p => p.AuthId == id)
                .Get();
            
            var profile = response.Models.FirstOrDefault();

            if (profile is null)
            {
                return Results.NotFound();
            }

            // create a profile record to return
            var profileDto = new ReturnProfileDto
            (
                profile.Id,
                profile.AuthId!,
                profile.AnimationType!
            );

            return Results.Ok(profileDto);
        });

        // POST /users/{id}/profiles
        app.MapPost("/users/{id}/profiles/create", async(string id, CreateProfileDto request, Supabase.Client supabase) =>
        {
            var profile = new Profile
            {
                AuthId = request.AuthId,
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
                return Results.NotFound();
            }

            // create a profile record to return
            var profileDto = new ReturnProfileDto
            (
                profile.Id,
                profile.AuthId!,
                profile.AnimationType!
            );

            return Results.Ok(profileDto);
        });

        // PUT /users/{id}/profiles
        app.MapPut("/users/{id}/profiles/update", async(string id, UpdateProfileDto request, Supabase.Client supabase) =>
        {
            // update animation type in profile table
            var response = await supabase
                .From<Profile>()
                .Where(p => p.AuthId == id)
                .Set(p => p.AnimationType!, request.AnimationType)
                .Update();

            var profile = response.Models.FirstOrDefault();

            if (profile is null)
            {
                return Results.NotFound();
            }

            // create a profile record to return
            var profileDto = new ReturnProfileDto
            (
                profile.Id,
                profile.AuthId!,
                profile.AnimationType!
            );

            return Results.Ok(profileDto);
        });
    }
}
