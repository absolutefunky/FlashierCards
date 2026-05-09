using FlashierCards.Api.Models;

namespace FlashierCards.Api.Dtos.UpdateDtos;

// use this record when updating a document (deck of cards) in MongoDB

public record UpdateCardDto (
    List<CardElement> FrontCards,
    List<CardElement> BackCards
);