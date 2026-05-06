using FlashierCards.Api.Dtos.CreateDtos;
using FlashierCards.Api.Dtos.ReturnDtos;
using FlashierCards.Api.Dtos.UpdateDtos;
using FlashierCards.Api.Models;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Driver;

namespace FlashierCards.Api.Endpoints;

public static class CardEndpoints
{
    public static void MapCardEndpoints(this WebApplication app)
    {
        // GET /user/{userId}/deck/{deckId}/cards to return deck content
        app.MapGet("/user/{userId}/deck/{deckId}/cards", [Authorize] async (int userId, int deckId, IMongoCollection<Card> collection) =>
        {
            // find doc in database
            var cardDoc = await collection
                .Find(c => c.UserId == userId && c.DeckId == deckId)
                .FirstOrDefaultAsync();

            if (cardDoc is null)
            {
                return Results.BadRequest(new { message = "No card content exist for this deck." });
            }

            var dto = new ReturnCardDto(
                cardDoc.UserId,
                cardDoc.DeckId,
                cardDoc.FrontCards,
                cardDoc.BackCards
            );

            return Results.Ok(dto);
        });

        // POST /user/{userId}/deck/{deckId}/createCards to create an initial doc when user creates a new deck
        app.MapPost("/user/{userId}/deck/{deckId}/createCards", [Authorize] async (int userId, int deckId, CreateCardDto request, IMongoCollection<Card> collection) =>
        {
            // create a doc to insert
            var newDocument = new Card
            {
                UserId = userId,
                DeckId = deckId,
                FrontCards = request.FrontCards,
                BackCards = request.BackCards
            };

            try
            {
                // insert new doc into database
                await collection.InsertOneAsync(newDocument);

                return Results.Ok(new { message = "Card content was successfully created."});

            } catch (Exception e)
            {
                // catch any exceptions and return error message
                return Results.BadRequest(new { message = "Card content could not be created.", error = e.Message });
            }
        });

        // PUT /user/{userId}/deck/{deckId}/saveCards to update card content when user clicks on save button
        app.MapPut("/user/{userId}/deck/{deckId}/saveCards", [Authorize] async (int userId, int deckId, UpdateCardDto request, IMongoCollection<Card> collection) =>
        {
            // create an updated doc
            var newDoc = new Card
            {
                UserId = userId,
                DeckId = deckId,
                FrontCards = request.FrontCards,
                BackCards = request.BackCards
            };

            var update = Builders<Card>.Update
                .Set(c => c.FrontCards, request.FrontCards)
                .Set(c => c.BackCards, request.BackCards);

            // update doc in database
            var result = await collection.UpdateOneAsync(c => c.UserId == userId && c.DeckId == deckId, update);

            // doc was not found and updated
            if (result.MatchedCount == 0 && result.ModifiedCount == 0)
            {
                return Results.BadRequest(new { message = "Card content was not updated." });
            }

            // find doc to return updated content
            var cardDoc = await collection
                .Find(c => c.UserId == userId && c.DeckId == deckId)
                .FirstOrDefaultAsync();

            var dto = new ReturnCardDto(
                cardDoc.UserId,
                cardDoc.DeckId,
                cardDoc.FrontCards,
                cardDoc.BackCards
            );

            return Results.Ok(new { message = "Card content was successfully saved.", dto });
        });

        // DELETE /user/{userId}/deck/{deckId}/deleteCards to delete deck content when user deletes a deck
        app.MapDelete("/user/{userId}/deck/{deckId}/deleteCards", [Authorize] async (int userId, int deckId, IMongoCollection<Card> collection) =>
        {
            // delete card doc
            var result = await collection.DeleteOneAsync(c => c.UserId == userId && c.DeckId == deckId);

            if (result.DeletedCount == 0)
            {
                return Results.BadRequest(new { message = "Card content was not successfully deleted." });
            } else
            {
                return Results.Ok(new { message = "Card content was successfully deleted." });
            }
        });

        // DELETE /user/{userId}/deleteCards to delete all deck content when user deletes their account
        app.MapDelete("/user/{userId}/deleteCards", [Authorize] async (int userId, IMongoCollection<Card> collection) =>
        {
            // delete all card docs associated with userId
            var result = await collection.DeleteManyAsync(c => c.UserId == userId);

            if (result.DeletedCount == 0)
            {
                return Results.BadRequest(new { message = "All card content was not successfully deleted." });   
            } else
            {
                return Results.Ok(new { message = "All card content was successfully deleted." });
            }
        });
    }
}
