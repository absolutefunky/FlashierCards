namespace FlashierCards.Api.Dtos;

public record UserDto(
    int Id,
    string Email,
    DateOnly DateAccountCreated
);