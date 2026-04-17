using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace FlashierCards.Api.Models;

// this model represents the users table in database

[Table("users")]
public class User : BaseModel
{
    [PrimaryKey("id", false)]
    public int Id { get; set; }

    [Column("email")]
    public string? Email { get; set; }

    [Column("password_hash")]
    public string? PasswordHash { get; set; }

    [Column("sq_answer")]
    public string? SQAnswer { get; set; }

    [Column("date_account_created")]
    public DateOnly DateAccountCreated { get; set; }
}
