namespace FlashierCards.Api.Dtos;

public record ChangePasswordDto(
    string Email,
    string CurrentPassword,
    string SQAnswer,
    string NewPassword,
    string ConfirmNewPassword
);