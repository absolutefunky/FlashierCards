namespace FlashierCards.Api.Dtos;

public record ForgotPasswordDto(
    string Email,
    string SQAnswer,
    string NewPassword,
    string ConfirmNewPassword
);