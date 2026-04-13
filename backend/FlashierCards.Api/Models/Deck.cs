using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace FlashierCards.Api.Models;

// this model represents the decks table in database

[Table("decks")]
public class Deck : BaseModel
{
    [PrimaryKey("id", false)]
    public int Id { get; set; }

    [Column("user_id")]
    public int UserId { get; set; }

    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [Column("last_updated")]
    public DateOnly LastUpdated { get; set; }
}
