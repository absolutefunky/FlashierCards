using FlashierCards.Api.Models;

namespace FlashierCards.Api.Dtos.UpdateDtos;

public class UpdateCardDto
{
    public CardElement? FrontCard { get; set; }
    public CardElement? BackCard { get; set; }
}