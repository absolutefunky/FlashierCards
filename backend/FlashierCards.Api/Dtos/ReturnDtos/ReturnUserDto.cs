namespace FlashierCards.Api.Dtos.ReturnDtos;

// use this record when returning user information

public record ReturnUserDto (
    int Id,
    string AuthId,
    string Username,
    string Email,
    DateOnly CreatedAt
);