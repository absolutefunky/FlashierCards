namespace FlashierCards.Api.Dtos;

// user information database expects from dotnet during insert request

public record CreateUserDto (
    string Email,
    string PasswordHash,
    string SQAnswer
);