using FlashierCards.Api.Models;

namespace FlashierCards.Api.Dtos.CreateDtos;

public class CreateCardDto
{
    public CardElement? FrontCard { get; set; }
    public CardElement? BackCard { get; set; }
}