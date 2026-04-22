using FlashierCards.Api.Dtos;
using FlashierCards.Api.Models;
using MongoDB.Driver;

namespace FlashierCards.Api.Endpoints;

public static class DeckContentEndpoints
{
    public static void MapDeckContentEndpoints(this WebApplication app)
    {
        // GET /users/{userId}/decks/{deckId}/content
        app.MapGet("/users/{userId}/decks/{deckId}/content",
            async (int userId, int deckId, Supabase.Client supabase, IMongoDatabase mongoDb) =>
            {
                // verify deck exists in Supabase
                var deckResponse = await supabase
                    .From<Deck>()
                    .Where(d => d.UserId == userId && d.Id == deckId)
                    .Get();

                var deck = deckResponse.Models.FirstOrDefault();

                if (deck is null)
                {
                    return Results.BadRequest(new { message = "Deck does not exist." });
                }

                var collection = mongoDb.GetCollection<DeckContent>("deck_contents");

                var deckContent = await collection
                    .Find(d => d.UserId == userId && d.DeckId == deckId)
                    .FirstOrDefaultAsync();

                if (deckContent is null)
                {
                    return Results.NotFound(new { message = "Deck content does not exist." });
                }

                return Results.Ok(deckContent);
            });

        // PUT /users/{userId}/decks/{deckId}/content/stickers
        app.MapPut("/users/{userId}/decks/{deckId}/content/stickers",
            async (int userId, int deckId, CreateStickerDto request, Supabase.Client supabase, IMongoDatabase mongoDb) =>
            {
                var deckResponse = await supabase
                    .From<Deck>()
                    .Where(d => d.UserId == userId && d.Id == deckId)
                    .Get();

                var deck = deckResponse.Models.FirstOrDefault();

                if (deck is null)
                {
                    return Results.BadRequest(new { message = "DECK DOESN'T EXIST" });
                }

                if (request.CardNumber <= 0)
                {
                    return Results.BadRequest(new { message = "NO CARDS AT ALL" });
                }

                var side = request.Side.Trim().ToLower();

                if (side != "front" && side != "back")
                {
                    return Results.BadRequest(new { message = "WHY AM I GETTING THIS ERROR LOLLL" });
                }

                var collection = mongoDb.GetCollection<DeckContent>("deck_contents");

                var deckContent = await collection
                    .Find(d => d.UserId == userId && d.DeckId == deckId)
                    .FirstOrDefaultAsync();

                if (deckContent is null)
                {
                    return Results.NotFound(new { message = "DECK CONTENT NOT IN MONGODB" });
                }

                var card = deckContent.Cards
                    .FirstOrDefault(c => c.CardNumber == request.CardNumber);

                if (card is null)
                {
                    return Results.NotFound(new { message = "CARD DOESN'T EXIST" });
                }

                var mappedStickers = request.Stickers.Select(s => new StickerData
                {
                    Input = s.Input,
                    X = s.X,
                    Y = s.Y
                }).ToList();

                if (side == "front")
                {
                    card.CardFront.Stickers = mappedStickers;
                }
                else
                {
                    card.CardBack.Stickers = mappedStickers;
                }

                await collection.ReplaceOneAsync(
                    d => d.Id == deckContent.Id,
                    deckContent
                );

                return Results.Ok(new
                {
                    message = "Sticker data updated successfully.",
                    cardNumber = request.CardNumber,
                    side = side
                });
            });
    }
}