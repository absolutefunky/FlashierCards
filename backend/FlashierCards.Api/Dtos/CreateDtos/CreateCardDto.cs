namespace FlashierCards.Api.Dtos.CreateDtos;

// use this record when creating a new document (deck of cards) in MongoDB

public record CreateCardDto (
    int UserId,
    int DeckId
    // add more here
);