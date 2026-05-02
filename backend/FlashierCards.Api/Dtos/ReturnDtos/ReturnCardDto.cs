using FlashierCards.Api.Models;

namespace FlashierCards.Api.Dtos.ReturnDtos;

public class ReturnCardDto
{
    public CardElement? FrontCard { get; set; }
    public CardElement? BackCard { get; set; }
}