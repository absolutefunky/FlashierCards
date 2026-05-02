using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FlashierCards.Api.Models;

// this model represents the deck content schema in MongoDB

public class Card
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("user_id")]
    public int UserId { get; set; }

    [BsonElement("deck_id")]
    public int DeckId { get; set; }

    [BsonElement("front_cards")]
    public List<CardElement> FrontCards { get; set; } = new();

    [BsonElement("back_cards")]
    public List<CardElement> BackCards { get; set; } = new();
}

[BsonIgnoreExtraElements]
public class CardElement
{
    [BsonElement("text")]
    public List<CardText> Text { get; set; } = new();

    [BsonElement("gif")]
    public List<CardGif> Gif { get; set; } = new();

    [BsonElement("sticker")]
    public List<CardSticker> Sticker { get; set; } = new();
}

[BsonIgnoreExtraElements]
public class CardText
{
    [BsonElement("input")]
    public string? Input { get; set; }

    [BsonElement("width")]
    public int Width {get; set; }

    [BsonElement("x")]
    public int X { get; set; }

    [BsonElement("y")]
    public int Y { get; set; }

    [BsonElement("font_size")]
    public int FontSize { get; set; }
    
    [BsonElement("color")]
    public string? Color { get; set; }
}

[BsonIgnoreExtraElements]
public class CardGif
{
    [BsonElement("url")]
    public string? Url { get; set; }

    [BsonElement("width")]
    public int Width { get; set; }

    [BsonElement("height")]
    public int Height { get; set; }

    [BsonElement("x")]
    public int X { get; set; }

    [BsonElement("y")]
    public int Y { get; set; }
}

[BsonIgnoreExtraElements]
public class CardSticker
{
    [BsonElement("url")]
    public string? Url { get; set; }

    [BsonElement("width")]
    public int Width { get; set; }

    [BsonElement("height")]
    public int Height { get; set; }

    [BsonElement("x")]
    public int X { get; set; }

    [BsonElement("y")]
    public int Y { get; set; }
}