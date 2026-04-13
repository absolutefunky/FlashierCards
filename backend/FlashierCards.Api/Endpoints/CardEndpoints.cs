using FlashierCards.Api.Dtos;
using FlashierCards.Api.Models;
using MongoDB.Driver;

namespace FlashierCards.Api.Endpoints;

public static class CardEndpoints
{
    public static void MapCardEndpoints(this WebApplication app)
    {
        var collection = app.Services
            .GetRequiredService<IMongoDatabase>()
            .GetCollection<DeckContent>("deck_contents");

        // GET /decks/{deckId}/cards
        app.MapGet("/decks/{deckId}/cards", async (int deckId) =>
        {
            var doc = await collection
                .Find(d => d.DeckId == deckId)
                .FirstOrDefaultAsync();

            if (doc is null)
            {
                return Results.NotFound();
            }

            return Results.Ok(doc.Cards);
        });

        // POST /decks/{deckId}/cards
        app.MapPost("/decks/{deckId}/cards", async (int deckId, int userId, CreateCardDto request) =>
        {
            var doc = await collection
                .Find(d => d.DeckId == deckId)
                .FirstOrDefaultAsync();

            var newCard = new Card
            {
                CardNumber = request.CardNumber,
                CardFront = request.CardFront,
                CardBack = request.CardBack
            };

            if (doc is null)
            {
                // create deck content document with first card
                doc = new DeckContent
                {
                    UserId = userId,
                    DeckId = deckId,
                    Cards = new List<Card> { newCard }
                };

                await collection.InsertOneAsync(doc);
            }
            else
            {
                // add card to existing deck content document
                var update = Builders<DeckContent>.Update.Push(d => d.Cards, newCard);
                await collection.UpdateOneAsync(d => d.DeckId == deckId, update);
            }

            return Results.Created($"/decks/{deckId}/cards/{request.CardNumber}", newCard);
        });

        // PUT /decks/{deckId}/cards/{cardNumber}
        app.MapPut("/decks/{deckId}/cards/{cardNumber}", async (int deckId, int cardNumber, UpdateCardDto request) =>
        {
            var doc = await collection
                .Find(d => d.DeckId == deckId)
                .FirstOrDefaultAsync();

            if (doc is null)
            {
                return Results.NotFound();
            }

            var card = doc.Cards.FirstOrDefault(c => c.CardNumber == cardNumber);

            if (card is null)
            {
                return Results.NotFound();
            }

            card.CardFront = request.CardFront;
            card.CardBack = request.CardBack;

            var update = Builders<DeckContent>.Update.Set(d => d.Cards, doc.Cards);
            await collection.UpdateOneAsync(d => d.DeckId == deckId, update);

            return Results.Ok(card);
        });

        // DELETE /decks/{deckId}/cards/{cardNumber}
        app.MapDelete("/decks/{deckId}/cards/{cardNumber}", async (int deckId, int cardNumber) =>
        {
            var update = Builders<DeckContent>.Update.PullFilter(
                d => d.Cards,
                c => c.CardNumber == cardNumber
            );

            await collection.UpdateOneAsync(d => d.DeckId == deckId, update);

            return Results.NoContent();
        });
    }
}
