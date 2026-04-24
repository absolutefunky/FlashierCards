using FlashierCards.Api.Models;

namespace FlashierCards.Api.Dtos;

public record CreateCardDto(
    int CardNumber,
    CardFace CardFront,
    CardFace CardBack
);
