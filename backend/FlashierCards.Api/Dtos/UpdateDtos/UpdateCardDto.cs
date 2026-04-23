using FlashierCards.Api.Models;

namespace FlashierCards.Api.Dtos.UpdateDtos;

public record UpdateCardDto
(
    int CardNumber,
    CardSide CardFront,
    CardSide CardBack
);