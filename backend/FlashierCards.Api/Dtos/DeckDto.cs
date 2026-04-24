using FlashierCards.Api.Models;

namespace FlashierCards.Api.Dtos;

// deck information dotnet expects from database during response

public record DeckDto (
    int Id,
    int UserId,
    string Name
);