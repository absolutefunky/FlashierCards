namespace FlashierCards.Api.Dtos;

// deck information database expects from dotnet during update request

public record UpdateDeckDto (
    string Name,
    int TotalCards
);