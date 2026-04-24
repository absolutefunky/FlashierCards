using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FlashierCards.Api.Models;

// top-level MongoDB document representing a deck's card content
public class DeckContent
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
    public List<Card> Cards { get; set; } = new();
}

public class Card
{
    [BsonElement("card_number")]
    public int CardNumber { get; set; }

    [BsonElement("card_front")]
    public CardFace CardFront { get; set; } = new();

    [BsonElement("card_back")]
    public CardFace CardBack { get; set; } = new();
}

public class CardFace
{
    [BsonElement("background_color")]
    public int BackgroundColor { get; set; }

    [BsonElement("text")]
    public List<TextObject> Text { get; set; } = new();

    [BsonElement("images")]
    public List<MediaObject> Images { get; set; } = new();

    [BsonElement("gifs")]
    public List<MediaObject> Gifs { get; set; } = new();

    [BsonElement("stickers")]
    public List<MediaObject> Stickers { get; set; } = new();
}

public class TextObject
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
}

public class MediaObject
{
    [BsonElement("input")]
    public string Input { get; set; } = string.Empty;

    [BsonElement("position")]
    public string Position { get; set; } = string.Empty;
}
