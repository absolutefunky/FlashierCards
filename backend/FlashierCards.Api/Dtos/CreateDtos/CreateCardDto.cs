using FlashierCards.Api.Models;

namespace FlashierCards.Api.Dtos.CreateDtos;

public record CreateCardDto
(
    CardSide CardFront,
    CardSide CardBack
);