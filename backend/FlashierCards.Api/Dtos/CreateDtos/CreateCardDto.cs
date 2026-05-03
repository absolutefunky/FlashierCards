using FlashierCards.Api.Models;

namespace FlashierCards.Api.Dtos.CreateDtos;

// use this record when creating a new document (deck of cards) in MongoDB

public record CreateCardDto (
    int UserId,
    int DeckId,
    List<CardElement> FrontCards,
    List<CardElement> BackCards
);