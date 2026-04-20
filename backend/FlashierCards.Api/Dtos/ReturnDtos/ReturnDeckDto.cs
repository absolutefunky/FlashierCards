namespace FlashierCards.Api.Dtos.ReturnDtos;

// use this record when return user deck information

public record ReturnDeckDto (
    int Id,
    int UserId,
    string Name
);