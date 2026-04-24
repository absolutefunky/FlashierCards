using FlashierCards.Api.Models;

namespace FlashierCards.Api.Dtos;

public record UpdateCardDto(
    CardFace CardFront,
    CardFace CardBack
);
