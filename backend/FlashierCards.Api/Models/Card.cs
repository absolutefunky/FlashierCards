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

[BsonIgnoreExtraElements]
public class CardSide
{
    [BsonElement("text")]
    public List<CardText> Text { get; set; } = new();

    [BsonElement("stickers")]
    public List<CardSticker> Stickers { get; set; } = new();
}

[BsonIgnoreExtraElements]
public class CardText
{
    [BsonElement("input")]
    public string Input { get; set; } = string.Empty;

    [BsonElement("width")]

    public double Width {get; set; }

    [BsonElement("x")]
    public double X { get; set; }

    [BsonElement("y")]
    public double Y { get; set; }

}

[BsonIgnoreExtraElements]
public class CardSticker
{
    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("x")]
    public double X { get; set; }

    [BsonElement("y")]
    public double Y { get; set; }
}