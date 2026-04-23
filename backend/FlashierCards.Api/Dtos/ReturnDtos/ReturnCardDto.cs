using FlashierCards.Api.Models;

namespace FlashierCards.Api.Dtos.ReturnDtos;

public record ReturnCardDto
(
    int CardNumber,
    CardSide CardFront,
    CardSide CardBack
);