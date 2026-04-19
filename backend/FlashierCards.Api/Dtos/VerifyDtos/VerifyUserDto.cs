namespace FlashierCards.Api.Dtos.VerifyDtos;

// use this record when verifying user for forgot password

public record VerifyUserDto (
    string Email,
    string SqAnswer
);