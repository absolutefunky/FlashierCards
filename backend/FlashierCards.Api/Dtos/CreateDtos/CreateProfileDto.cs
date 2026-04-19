namespace FlashierCards.Api.Dtos.CreateDtos;

// use this record when creating a new user profile

public record CreateProfileDto (
    string UserId,
    string BackgroundColor,
    string AnimationType
);