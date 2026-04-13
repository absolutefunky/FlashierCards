using FlashierCards.Api.Dtos;
using FlashierCards.Api.Models;

namespace FlashierCards.Api.Endpoints;

public static class DeckEndpoints
{
    public static void MapDeckEndpoints(this WebApplication app)
    {
        // GET /users/id/decks
        app.MapGet("/users/{id}/decks", async (int id, Supabase.Client supabase) =>
        {
            var response = await supabase
                .From<Deck>()
                .Where(d => d.UserId == id)
                .Get();

            var decks = response.Models.Select(d => new DeckDto(
                d.Id,
                d.UserId,
                d.Name,
                d.LastUpdated
            ));

            return Results.Ok(decks);
        });

        // POST /users/id/decks
        app.MapPost("/users/{id}/decks", async (int id, CreateDeckDto request, Supabase.Client supabase) =>
        {
            var deck = new Deck
            {
                UserId = id,
                Name = request.Name,
                LastUpdated = DateOnly.FromDateTime(DateTime.UtcNow)
            };

            var response = await supabase
                .From<Deck>()
                .Insert(deck);

            var created = response.Models.FirstOrDefault();

            if (created is null)
            {
                return Results.BadRequest();
            }

            var deckDto = new DeckDto(
                created.Id,
                created.UserId,
                created.Name,
                created.LastUpdated
            );

            return Results.Created($"/users/{id}/decks/{created.Id}", deckDto);
        });

        // PUT /users/id/decks/deckId
        app.MapPut("/users/{id}/decks/{deckId}", async (int id, int deckId, UpdateDeckDto request, Supabase.Client supabase) =>
        {
            var response = await supabase
                .From<Deck>()
                .Where(d => d.UserId == id && d.Id == deckId)
                .Set(d => d.Name, request.Name)
                .Set(d => d.LastUpdated, request.LastUpdated)
                .Update();

            var deck = response.Models.FirstOrDefault();

            if (deck is null)
            {
                return Results.NotFound();
            }

            var deckDto = new DeckDto(
                deck.Id,
                deck.UserId,
                deck.Name,
                deck.LastUpdated
            );

            return Results.Ok(deckDto);
        });

        // DELETE /users/id/decks/deckId
        app.MapDelete("/users/{id}/decks/{deckId}", async (int id, int deckId, Supabase.Client supabase) =>
        {
            await supabase
                .From<Deck>()
                .Where(d => d.UserId == id && d.Id == deckId)
                .Delete();

            return Results.NoContent();
        });
    }
}
