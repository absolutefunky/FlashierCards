namespace FlashierCards.Api.Dtos.CreateDtos;

// use this record when creating a new user

public record CreateUserDto (
    string Email,
    string Password,
    string SqAnswer
);