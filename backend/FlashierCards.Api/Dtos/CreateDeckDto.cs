namespace FlashierCards.Api.Dtos;

// deck information database expects from dotnet during insert

public record CreateDeckDto (
    int UserId,
    string Name
);