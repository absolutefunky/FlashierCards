using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class DeckContent
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("_id")]
    public string Id { get; set; } = null!;

    [BsonElement("doc_id")]
    public int DocId { get; set; }

    [BsonElement("user_id")]
    public int UserId { get; set; }

    [BsonElement("deck_id")]
    public int DeckId { get; set; }

    [BsonElement("cards")]
    public List<CardData> Cards { get; set; } = new();
}

public class CardData
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
    public int BackgroundColor { get; set; }

    [BsonElement("text")]
    public List<object> Text { get; set; } = new();

    [BsonElement("images")]
    public List<object> Images { get; set; } = new();

    [BsonElement("gifs")]
    public List<object> Gifs { get; set; } = new();

    [BsonElement("stickers")]
    public List<StickerData> Stickers { get; set; } = new();
}
public class StickerData
{
    [BsonElement("input")]
    public string Input { get; set; } = string.Empty;

    [BsonElement("x")]
    public double X { get; set; }

    [BsonElement("y")]
    public double Y { get; set; }
}
