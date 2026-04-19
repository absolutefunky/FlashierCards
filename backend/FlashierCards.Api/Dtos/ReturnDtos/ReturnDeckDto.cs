namespace FlashierCards.Api.Dtos.ReturnDtos;

// use this record when return user deck information

public record ReturnDeckDto (
    int Id,
    string UserId,
    string Name
);