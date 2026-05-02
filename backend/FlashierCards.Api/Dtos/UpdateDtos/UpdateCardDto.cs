namespace FlashierCards.Api.Dtos.UpdateDtos;

// use this record when updating a document (deck of cards) in MongoDB

public record UpdateCardDto (
    int DeckId
    // add more here
);