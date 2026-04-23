using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FlashierCards.Api.Models;

public class Card
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("doc_id")]
    public int DocId { get; set; }

    [BsonElement("user_id")]
    public int UserId { get; set; }

    [BsonElement("deck_id")]
    public int DeckId { get; set; }

    [BsonElement("cards")]
    public List<CardList> Cards { get; set; } = new();
}

public class CardList
{
    [BsonElement("card_number")]
    public int CardNumber { get; set; }

    [BsonElement("card_front")]
    public CardSide CardFront { get; set; } = new();

    [BsonElement("card_back")]
    public CardSide CardBack { get; set; } = new();
}

public class CardSide
{
    [BsonElement("background_color")]
    public int BackgroundColor { get; set; } = 16777215;

    [BsonElement("text")]
    public List<CardText> Text { get; set; } = new();

    [BsonElement("stickers")]
    public List<CardSticker> Stickers { get; set; } = new();
}

public class CardText
{
    [BsonElement("input")]
    public string Input { get; set; } = string.Empty;

    [BsonElement("color")]
    public int Color { get; set; }

    [BsonElement("bold")]
    public bool Bold { get; set; }

    [BsonElement("italic")]
    public bool Italic { get; set; }

    [BsonElement("highlight")]
    public int Highlight { get; set; }

    [BsonElement("position")]
    public string Position { get; set; } = string.Empty;

    [BsonElement("text_type")]
    public string TextType { get; set; } = string.Empty;
}

public class CardSticker
{
    [BsonElement("input")]
    public string Input { get; set; } = string.Empty;

    [BsonElement("position")]
    public string Position { get; set; } = string.Empty;
}