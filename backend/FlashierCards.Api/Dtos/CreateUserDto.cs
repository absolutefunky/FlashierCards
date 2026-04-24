namespace FlashierCards.Api.Dtos;

// user information database expects from dotnet during insert

public record CreateUserDto (
    string Username,
    string PasswordHash,
    string Email
);