namespace FlashierCards.Api.Dtos;

public class CreateStickerDto
{
    public int CardNumber { get; set; }
    public string Side { get; set; } = string.Empty;
    public List<StickerDto> Stickers { get; set; } = new();
}
