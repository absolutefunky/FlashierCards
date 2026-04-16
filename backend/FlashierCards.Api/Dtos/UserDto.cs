namespace FlashierCards.Api.Dtos;

// user information dotnet expects from database during response

public record UserDto (
    int Id,
    string Email,
    string PasswordHash,
    string SQAnswer,
    DateOnly DateAccountCreated,
    int TotalDecks
);