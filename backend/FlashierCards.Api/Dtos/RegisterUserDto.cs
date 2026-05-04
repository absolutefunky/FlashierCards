namespace FlashierCards.Api.Dtos;

public record RegisterUserDto(
    string Email,
    string Password,
    string ConfirmPassword,
    string SQAnswer
);