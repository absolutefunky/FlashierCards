namespace FlashierCards.Api.Dtos.UpdateDtos;

// use this record when updating password for user

public record UpdateUserDto (
    string Email,
    string SqAnswer,
    string CurrentPassword,
    string NewPassword,
    string ConfirmNewPassword
);