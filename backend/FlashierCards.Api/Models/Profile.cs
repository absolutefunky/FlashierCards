using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace FlashierCards.Api.Models;

// this model represents the profiles table in database

[Table("profiles")]
public class Profile : BaseModel
{
    [PrimaryKey("id", false)]
    public int Id { get; set; }

    [Column("auth_id")]
    public string? AuthId { get; set; }

    [Column("background_color")]
    public string? BackgroundColor { get; set; }

    [Column("animation_type")]
    public string? AnimationType { get; set; }
}
