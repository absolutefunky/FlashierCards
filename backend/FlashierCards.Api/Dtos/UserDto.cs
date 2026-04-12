namespace FlashierCards.Api.Dtos;

// user information dotnet expects from database during response

public record UserDto (
    int Id,
    string Username,
    string PasswordHash,
    string Email,
    DateOnly DateAccountCreated
);