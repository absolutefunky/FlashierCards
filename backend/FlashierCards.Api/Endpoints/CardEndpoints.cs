using FlashierCards.Api.Dtos.CreateDtos;
using FlashierCards.Api.Dtos.UpdateDtos;
using FlashierCards.Api.Dtos;
using FlashierCards.Api.Models;
using MongoDB.Driver;

namespace FlashierCards.Api.Endpoints;

public static class CardEndpoints
{
    public static void MapCardEndpoints(this WebApplication app)
    {
        var collectionName = "deck_contents";

        // GET all cards for one deck
        app.MapGet("/users/{userId}/decks/{deckId}/cards", async (
            int userId,
            int deckId,
            IMongoDatabase database) =>
        {
            var collection = database.GetCollection<Card>(collectionName);

            var cardDoc = await collection
                .Find(c => c.UserId == userId && c.DeckId == deckId)
                .FirstOrDefaultAsync();

            if (cardDoc is null)
            {
                return Results.NotFound(new { message = "NO CARD CONTENT EXIST FOR THIS DECK." });
            }

            return Results.Ok(new
            {
                frontCards = cardDoc.FrontCards,
                backCards = cardDoc.BackCards
            });
        });

        // GET one card by cardNumber
        app.MapGet("/users/{userId}/decks/{deckId}/cards/{cardNumber}", async (
            int userId,
            int deckId,
            int cardNumber,
            IMongoDatabase database) =>
        {
            var collection = database.GetCollection<Card>(collectionName);

            var cardDoc = await collection
                .Find(c => c.UserId == userId && c.DeckId == deckId)
                .FirstOrDefaultAsync();

            if (cardDoc is null)
            {
                return Results.NotFound(new { message = "NO CARD CONTENT EXIST FOR THIS DECK." });
            }

            int index = cardNumber - 1;

            if (index < 0 || index >= cardDoc.FrontCards.Count || index >= cardDoc.BackCards.Count)
            {
                return Results.NotFound(new { message = "CARD DOES NOT EXIST." });
            }

            return Results.Ok(new
            {
                cardNumber,
                frontCard = cardDoc.FrontCards[index],
                backCard = cardDoc.BackCards[index]
            });
        });

        // POST create a new card
        app.MapPost("/users/{userId}/decks/{deckId}/cards/create", async (
            int userId,
            int deckId,
            CreateCardDto request,
            IMongoDatabase database) =>
        {
            var collection = database.GetCollection<Card>(collectionName);

            var cardDoc = await collection
                .Find(c => c.UserId == userId && c.DeckId == deckId)
                .FirstOrDefaultAsync();

            var frontCard = request.FrontCard ?? new CardElement();
            var backCard = request.BackCard ?? new CardElement();

            if (cardDoc is null)
            {
                var newDocument = new Card
                {
                    UserId = userId,
                    DeckId = deckId,
                    FrontCards = new List<CardElement> { frontCard },
                    BackCards = new List<CardElement> { backCard }
                };

                await collection.InsertOneAsync(newDocument);

                return Results.Ok(new
                {
                    message = "Card successfully created :).",
                    cardNumber = 1,
                    frontCard,
                    backCard
                });
            }

            var update = Builders<Card>.Update
                .Push(c => c.FrontCards, frontCard)
                .Push(c => c.BackCards, backCard);

            await collection.UpdateOneAsync(
                c => c.UserId == userId && c.DeckId == deckId,
                update
            );

            int newCardNumber = cardDoc.FrontCards.Count + 1;

            return Results.Ok(new
            {
                message = "Card was successfully created :).",
                cardNumber = newCardNumber,
                frontCard,
                backCard
            });
        });

        // PUT update one card
        app.MapPut("/users/{userId}/decks/{deckId}/cards/{cardNumber}", async (
            int userId,
            int deckId,
            int cardNumber,
            UpdateCardDto request,
            IMongoDatabase database) =>
        {
            var collection = database.GetCollection<Card>(collectionName);

            var cardDoc = await collection
                .Find(c => c.UserId == userId && c.DeckId == deckId)
                .FirstOrDefaultAsync();

            if (cardDoc is null)
            {
                return Results.NotFound(new { message = "CARD CONTENT DOES NOT EXIST." });
            }

            int index = cardNumber - 1;

            if (index < 0 || index >= cardDoc.FrontCards.Count || index >= cardDoc.BackCards.Count)
            {
                return Results.NotFound(new { message = "CARD DOESN'T EXIST." });
            }

            cardDoc.FrontCards[index] = request.FrontCard ?? new CardElement();
            cardDoc.BackCards[index] = request.BackCard ?? new CardElement();

            await collection.ReplaceOneAsync(
                c => c.UserId == userId && c.DeckId == deckId,
                cardDoc
            );

            return Results.Ok(new
            {
                message = "Card was successfully updated :P.",
                cardNumber,
                frontCard = cardDoc.FrontCards[index],
                backCard = cardDoc.BackCards[index]
            });
        });


        // PUT hopefully this works for edit view
        app.MapPut("/users/{userId}/decks/{deckId}/cards/save", async (
            int userId,
            int deckId,
            SaveCardsDto request,
            IMongoDatabase database) =>
        {
            var collection = database.GetCollection<Card>("deck_contents");

            var existingDoc = await collection
                .Find(c => c.UserId == userId && c.DeckId == deckId)
                .FirstOrDefaultAsync();

            if (existingDoc is null)
            {
                var newDoc = new Card
                {
                    UserId = userId,
                    DeckId = deckId,
                    FrontCards = request.FrontCards,
                    BackCards = request.BackCards
                };

                await collection.InsertOneAsync(newDoc);

                return Results.Ok(new
                {
                    message = "Card content was saved successfully ;D.",
                    frontCards = newDoc.FrontCards,
                    backCards = newDoc.BackCards
                });
            }

            var update = Builders<Card>.Update
                .Set(c => c.FrontCards, request.FrontCards)
                .Set(c => c.BackCards, request.BackCards);

            await collection.UpdateOneAsync(
                c => c.UserId == userId && c.DeckId == deckId,
                update
            );

            return Results.Ok(new
            {
                message = "Card content was saved successfully ;D.",
                frontCards = request.FrontCards,
                backCards = request.BackCards
            });
        });
    

        // DELETE one card
        app.MapDelete("/users/{userId}/decks/{deckId}/cards/{cardNumber}/delete", async (
            int userId,
            int deckId,
            int cardNumber,
            IMongoDatabase database) =>
        {
            var collection = database.GetCollection<Card>(collectionName);

            var cardDoc = await collection
                .Find(c => c.UserId == userId && c.DeckId == deckId)
                .FirstOrDefaultAsync();

            if (cardDoc is null)
            {
                return Results.NotFound(new { message = "CARD CONTENT DOES NOT EXIST." });
            }

            int index = cardNumber - 1;

            if (index < 0 || index >= cardDoc.FrontCards.Count || index >= cardDoc.BackCards.Count)
            {
                return Results.NotFound(new { message = "CARD DOES NOT EXIST." });
            }

            cardDoc.FrontCards.RemoveAt(index);
            cardDoc.BackCards.RemoveAt(index);

            await collection.ReplaceOneAsync(
                c => c.UserId == userId && c.DeckId == deckId,
                cardDoc
            );

            return Results.Ok(new
            {
                message = "Card was successfully deleted :O.",
                frontCards = cardDoc.FrontCards,
                backCards = cardDoc.BackCards
            });
        });
    }
}