namespace FlashierCards.Api.Dtos.CreateDtos;

// use this record when creating a new user

public record CreateUserDto (
    string AuthId,
    string Username,
    string Email,
    string SqAnswer
);