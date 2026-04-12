namespace FlashierCards.Api.Dtos;

// profile information database expects from dotnet during update

public record UpdateProfileDto (
    string BackgroundColor,
    string AnimationType
);