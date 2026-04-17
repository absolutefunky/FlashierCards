namespace FlashierCards.Api.Dtos.VerifyDtos;

// use this record when verifying user for login

public record class VerifyLoginDto (
    string Email,
    string Password
);
