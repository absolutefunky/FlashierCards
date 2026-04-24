namespace FlashierCards.Api.Dtos;

// user information database expects from dotnet during update

public record UpdateUserDto (
    string PasswordHash
);