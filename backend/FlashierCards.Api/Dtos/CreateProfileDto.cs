namespace FlashierCards.Api.Dtos;

// profile information database expects from dotnet during insert request

public record CreateProfileDto (
    int UserId,
    string AnimationType
);