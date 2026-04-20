namespace FlashierCards.Api.Dtos.ReturnDtos;

// use this record when returning user profile information

public record ReturnProfileDto (
    int Id,
    string AuthId,
    string AnimationType
);