using FlashierCards.Api.Models;

namespace FlashierCards.Api.Dtos.ReturnDtos;

// use this record when returning a document (deck of cards) from MongoDB

public record ReturnCardDto (
    int UserId,
    int DeckId,
    List<CardElement> FrontCards,
    List<CardElement> BackCards
);