using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace FlashierCards.Api.Models;

// this model represents the users table in database

[Table("users")]
public class User : BaseModel
{
    [PrimaryKey("id", false)]
    public int Id { get; set; }

    [Column("auth_id")]
    public string? AuthId { get; set; }

    [Column("username")]
    public string? Username { get; set; }

    [Column("email")]
    public string? Email { get; set; }

    [Column("sq_answer")]
    public string? SqAnswer { get; set; }

    [Column("created_at")]
    public DateOnly CreatedAt { get; set; }
}
