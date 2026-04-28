using FlashierCards.Api.Dtos.CreateDtos;
using FlashierCards.Api.Dtos.ReturnDtos;
using FlashierCards.Api.Dtos.UpdateDtos;
using FlashierCards.Api.Models;
using MongoDB.Driver;

namespace FlashierCards.Api.Endpoints;

public static class CardEndpoints
{
    public static void MapCardEndpoints(this WebApplication app)
    {
        // GET /users/{userId}/decks/{deckId}/cards to return deck content
        app.MapGet("/users/{userId}/decks/{deckId}/cards", async (int userId, int deckId, IMongoCollection<Card> collection) =>
        {
            var cardDoc = await collection
                .Find(c => c.UserId == userId && c.DeckId == deckId)
                .FirstOrDefaultAsync();

            if (cardDoc is null)
            {
                return Results.NotFound(new { message = "NO CARDS HAVE BEEN ADDED YET." });
            }

            var dto = new ReturnCardDto(
                cardDoc.UserId,
                cardDoc.DeckId,
                cardDoc.FrontCards,
                cardDoc.BackCards
            );

            return Results.Ok(dto);
        });
    }
}
