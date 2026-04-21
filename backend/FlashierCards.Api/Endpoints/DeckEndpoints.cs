using FlashierCards.Api.Dtos.CreateDtos;
using FlashierCards.Api.Dtos.ReturnDtos;
using FlashierCards.Api.Dtos.UpdateDtos;
using FlashierCards.Api.Models;

namespace FlashierCards.Api.Endpoints;

public static class DeckEndpoints
{
    public static void MapDeckEndpoints(this WebApplication app)
    {
        // GET /users/{id}/decks to return all decks
        app.MapGet("/users/{id}/decks", async (int id, Supabase.Client supabase) =>
        {
            var response = await supabase
                .From<Deck>()
                .Where(d => d.UserId == id)
                .Get();

            // store decks in a list
            List<Deck> decks = response.Models;

            // check if decks exist
            if (decks.Count == 0)
            {
                return Results.BadRequest(new {message = "User has not created any decks."});
            }
           
            var deckList = decks.Select(d => new ReturnDeckDto
            (
                d.Id,
                d.UserId,
                d.Name!
            ));

            return Results.Ok(deckList);
        });

        // GET /users/{userId}/decks{id} to get a specific deck
        app.MapGet("/users/{userId}/decks/{id}", async (int userId, int id, Supabase.Client supabase) =>
        {
            var response = await supabase
                .From<Deck>()
                .Where(d => d.UserId == userId && d.Id == id)
                .Get();

            var deck = response.Models.FirstOrDefault();

            // check if decks exist
            if (deck is null)
            {
                return Results.BadRequest(new {message = "Deck does not exist."});
            }
           
            var deckDto = new ReturnDeckDto
            (
                deck.Id,
                deck.UserId,
                deck.Name!
            );

            return Results.Ok(deckDto);
        });

        // POST /users/{id}/decks/create to create a new a deck
        app.MapPost("/users/{id}/decks/create", async (int id, CreateDeckDto request, Supabase.Client supabase) =>
        {
            // check if an input field is empty
            if (string.IsNullOrWhiteSpace(request.Name))
            {
                return Results.BadRequest(new { message = "Please properly complete the form." });
            }

            // check if user id violates foregin key constraint
            var userResponse = await supabase
                .From<User>()
                .Where(u => u.Id == id)
                .Get();

            var userFound = userResponse.Models.FirstOrDefault();

            if (userFound is null)
            {
                return Results.BadRequest(new {message = "Invalid request. User does not exist."});
            }

            // check if deck with given name for user already exist
            var deckResponse = await supabase
                .From<Deck>()
                .Where(d => d.UserId == id && d.Name == request.Name)
                .Get();

            var deckFound = deckResponse.Models.FirstOrDefault();

            if (deckFound is not null)
            {
                return Results.BadRequest(new {message = "Please choose a different name."});
            }

            var deck = new Deck
            {
                UserId = id,
                Name = request.Name
            };

            // insert deck into table
            var response = await supabase
                .From<Deck>()
                .Insert(deck);

            var created = response.Models.FirstOrDefault();

            // check if deck was created
            if (created is null)
            {
                return Results.BadRequest(new {message = "Deck was not created."});
            }

            var deckDto = new ReturnDeckDto
            (
                created.Id,
                created.UserId,
                created.Name!
            );

            return Results.Ok(new {message = "Deck was successfully created.", deckDto});
        });

        // PUT /users/{userId}/decks/{id}/rename to rename a deck
        app.MapPut("/users/{userId}/decks/{id}", async (int userId, int id, UpdateDeckDto request, Supabase.Client supabase) =>
        {
            // check if an input field is empty
            if (string.IsNullOrWhiteSpace(request.Name))
            {
                return Results.BadRequest(new { message = "Please properly complete the form." });
            }

            // check if user id violates foregin key constraint
            var userResponse = await supabase
                .From<User>()
                .Where(u => u.Id == userId)
                .Get();

            var userFound = userResponse.Models.FirstOrDefault();

            if (userFound is null)
            {
                return Results.BadRequest(new {message = "Invalid request. User does not exist."});
            }

            // check if deck with given name for user already exist
            var deckResponse = await supabase
                .From<Deck>()
                .Where(d => d.UserId == userId && d.Name == request.Name)
                .Get();

            var deckFound = deckResponse.Models.FirstOrDefault();

            if (deckFound is not null)
            {
                return Results.BadRequest(new {message = "Please choose a different name."});
            }

            // update deck name
            var response = await supabase
                .From<Deck>()
                .Where(d => d.UserId == userId && d.Id == id)
                .Set(d => d.Name!, request.Name)
                .Update();

            var deck = response.Models.FirstOrDefault();

            if (deck is null)
            {
                return Results.NotFound(new {message = "Deck was not updated."});
            }

            var deckDto = new ReturnDeckDto(
                deck.Id,
                deck.UserId,
                deck.Name!
            );

            return Results.Ok(new {message = "Deck was successfully renamed.", deckDto});
        });

        // DELETE /users/{userId}/decks/{id}/delete to delete a deck
        app.MapDelete("/users/{userId}/decks/{id}/delete", async (int userId, int id, Supabase.Client supabase) =>
        {
            // check if user id violates foregin key constraint
            var userResponse = await supabase
                .From<User>()
                .Where(u => u.Id == userId)
                .Get();

            var userFound = userResponse.Models.FirstOrDefault();

            if (userFound is null)
            {
                return Results.BadRequest(new {message = "Invalid request. User does not exist."});
            }

            // check if deck exist
            var response = await supabase
                .From<Deck>()
                .Where(d => d.UserId == userId && d.Id == id)
                .Get();

            var deckFound = response.Models.FirstOrDefault();

            if (deckFound is null)
            {
                return Results.BadRequest(new {message = "Deck does not exist."});
            }

            // delete the deck
            await supabase
                .From<Deck>()
                .Where(d => d.UserId == userId && d.Id == id)
                .Delete();

            // check if deck was deleted
            response = await supabase
                .From<Deck>()
                .Where(d => d.UserId == userId && d.Id == id)
                .Get();

            deckFound = response.Models.FirstOrDefault();

            if (deckFound is null)
            {
                return Results.Ok(new {message = "Deck was successfully deleted."});
            }

            return Results.BadRequest(new {message = "Deck was not deleted."});
        });
    }
}
