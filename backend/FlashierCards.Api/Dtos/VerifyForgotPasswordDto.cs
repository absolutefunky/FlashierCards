namespace FlashierCards.Api.Dtos;

public record VerifyForgotPasswordDto(
    string Email,
    string SQAnswer
);