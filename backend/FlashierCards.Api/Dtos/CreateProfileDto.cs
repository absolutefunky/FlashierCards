namespace FlashierCards.Api.Dtos;

// profile information database expects from dotnet during insert

public record CreateProfileDto (
    int UserId,
    string BackgroundColor,
    string AnimationType
);