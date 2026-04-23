using FlashierCards.Api.Dtos.CreateDtos;
using FlashierCards.Api.Dtos.UpdateDtos;
using FlashierCards.Api.Models;
using MongoDB.Driver;

namespace FlashierCards.Api.Endpoints;

public static class CardEndpoints
{
    public static void MapCardEndpoints(this WebApplication app)
    {
        // GET /users/{userId}/decks/{deckId}/cards
        app.MapGet("/users/{userId}/decks/{deckId}/cards", async (
            int userId,
            int deckId,
            IMongoDatabase database) =>
        {
            var collection = database.GetCollection<Card>("deck_contents");

            var cardDoc = await collection
                .Find(c => c.UserId == userId && c.DeckId == deckId)
                .FirstOrDefaultAsync();

            if (cardDoc is null || cardDoc.Cards.Count == 0)
            {
                return Results.NotFound(new { message = "NO CARDS HAVE BEEN ADDED YET." });
            }

            return Results.Ok(cardDoc.Cards);
        });

        // GET /users/{userId}/decks/{deckId}/cards/{cardNumber}
        app.MapGet("/users/{userId}/decks/{deckId}/cards/{cardNumber}", async (
            int userId,
            int deckId,
            int cardNumber,
            IMongoDatabase database) =>
        {
            var collection = database.GetCollection<Card>("deck_contents");

            var cardDoc = await collection
                .Find(c => c.UserId == userId && c.DeckId == deckId)
                .FirstOrDefaultAsync();

            if (cardDoc is null)
            {
                return Results.NotFound(new { message = "CARD CONTENT DOES NOT EXIST." });
            }

            var card = cardDoc.Cards
                .FirstOrDefault(c => c.CardNumber == cardNumber);

            if (card is null)
            {
                return Results.NotFound(new { message = "CARD DOES NOT EXIST." });
            }

            return Results.Ok(card);
        });

        // POST /users/{userId}/decks/{deckId}/cards/create
        app.MapPost("/users/{userId}/decks/{deckId}/cards/create", async (
            int userId,
            int deckId,
            CreateCardDto request,
            IMongoDatabase database) =>
        {
            var collection = database.GetCollection<Card>("deck_contents");

            var cardDoc = await collection
                .Find(c => c.UserId == userId && c.DeckId == deckId)
                .FirstOrDefaultAsync();

            int nextCardNumber = cardDoc?.Cards.Count + 1 ?? 1;

            var newCard = new CardList
            {
                CardNumber = nextCardNumber,
                CardFront = request.CardFront,
                CardBack = request.CardBack
            };

            if (cardDoc is null)
            {
                var newDocument = new Card
                {
                    DocId = 0,
                    UserId = userId,
                    DeckId = deckId,
                    Cards = new List<CardList> { newCard }
                };

                await collection.InsertOneAsync(newDocument);

                return Results.Ok(new
                {
                    message = "Card were successfully created :).",
                    card = newCard
                });
            }

            var update = Builders<Card>.Update.Push(c => c.Cards, newCard);

            await collection.UpdateOneAsync(
                c => c.UserId == userId && c.DeckId == deckId,
                update
            );

            return Results.Ok(new
            {
                message = "Card was successfully created :).",
                card = newCard
            });
        });

        // PUT /users/{userId}/decks/{deckId}/cards/{cardNumber}
        app.MapPut("/users/{userId}/decks/{deckId}/cards/{cardNumber}", async (
            int userId,
            int deckId,
            int cardNumber,
            UpdateCardDto request,
            IMongoDatabase database) =>
        {
            var collection = database.GetCollection<Card>("deck_contents");

            var cardDoc = await collection
                .Find(c => c.UserId == userId && c.DeckId == deckId)
                .FirstOrDefaultAsync();

            if (cardDoc is null)
            {
                return Results.NotFound(new { message = "CARD CONTENT DOES NOT EXIST." });
            }

            int cardIndex = cardDoc.Cards
                .FindIndex(c => c.CardNumber == cardNumber);

            if (cardIndex == -1)
            {
                return Results.NotFound(new { message = "CARD DOES NOT EXIST." });
            }

            cardDoc.Cards[cardIndex] = new CardList
            {
                CardNumber = cardNumber,
                CardFront = request.CardFront,
                CardBack = request.CardBack
            };

            await collection.ReplaceOneAsync(
                c => c.UserId == userId && c.DeckId == deckId,
                cardDoc
            );

            return Results.Ok(new
            {
                message = "Card was successfully updated :P.",
                card = cardDoc.Cards[cardIndex]
            });
        });

        // DELETE /users/{userId}/decks/{deckId}/cards/{cardNumber}/delete
        app.MapDelete("/users/{userId}/decks/{deckId}/cards/{cardNumber}/delete", async (
            int userId,
            int deckId,
            int cardNumber,
            IMongoDatabase database) =>
        {
            var collection = database.GetCollection<Card>("deck_contents");

            var cardDoc = await collection
                .Find(c => c.UserId == userId && c.DeckId == deckId)
                .FirstOrDefaultAsync();

            if (cardDoc is null)
            {
                return Results.NotFound(new { message = "CARD CONTENT DOES NOT EXIST." });
            }

            var byeCard = cardDoc.Cards
                .FirstOrDefault(c => c.CardNumber == cardNumber);

            if (byeCard is null)
            {
                return Results.NotFound(new { message = "CARD DOES NOT EXIST." });
            }

            cardDoc.Cards.Remove(byeCard);

            for (int i = 0; i < cardDoc.Cards.Count; i++)
            {
                cardDoc.Cards[i].CardNumber = i + 1;
            }

            await collection.ReplaceOneAsync(
                c => c.UserId == userId && c.DeckId == deckId,
                cardDoc
            );

            return Results.Ok(new
            {
                message = "Card was successfully deleted :O.",
                cards = cardDoc.Cards
            });
        });
    }
}