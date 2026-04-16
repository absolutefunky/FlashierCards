namespace FlashierCards.Api.Dtos;

// profile information dotnet expects from database during response

public record ProfileDto (
    int Id,
    int UserId,
    string? AnimationType
);