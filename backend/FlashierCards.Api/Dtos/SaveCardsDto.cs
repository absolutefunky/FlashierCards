using FlashierCards.Api.Models;

namespace FlashierCards.Api.Dtos;
public class SaveCardsDto
{
    public List<CardElement> FrontCards { get; set; } = new();
    public List<CardElement> BackCards { get; set; } = new();
}