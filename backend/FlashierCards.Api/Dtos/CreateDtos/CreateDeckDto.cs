namespace FlashierCards.Api.Dtos.CreateDtos;

// use this record when creating a new deck

public record CreateDeckDto (
    string UserId,
    string Name
);