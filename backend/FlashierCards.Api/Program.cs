using System.Text;
using FlashierCards.Api;
using FlashierCards.Api.Endpoints;
using FlashierCards.Api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// database url and public key from Supabase
var url = builder.Configuration.GetSection("SUPABASE_URL").Get<string>();
var key = builder.Configuration.GetSection("SUPABASE_KEY").Get<string>();

if (string.IsNullOrWhiteSpace(url) || string.IsNullOrWhiteSpace(key))
{
    throw new Exception("Supabase configuration is missing.");
}

var options = new Supabase.SupabaseOptions
{
    AutoRefreshToken = true,
    AutoConnectRealtime = true
};

// creating Supabase client to establish connection with database
var supabase = new Supabase.Client(url!, key, options);
await supabase.InitializeAsync();

builder.Services.AddSingleton(supabase);

// database uri, name, and collection from MongoDB
var mongodb_uri = builder.Configuration.GetSection("MONGODB_URI").Get<string>();
var mongodb_name = builder.Configuration.GetSection("MONGODB_NAME").Get<string>();
var mongodb_collection = builder.Configuration.GetSection("MONGODB_Collection").Get<string>();

if (string.IsNullOrWhiteSpace(mongodb_uri) || string.IsNullOrWhiteSpace(mongodb_name)
    || string.IsNullOrWhiteSpace(mongodb_collection))
{
    throw new Exception("MongoDB configuration is missing.");
}


// creating MongoDb client to establish connection with database
builder.Services.AddSingleton(_ =>
{
    var mongodb = new MongoClient(mongodb_uri);
    var database = mongodb.GetDatabase(mongodb_name);
    return database.GetCollection<Card>(mongodb_collection); 
});

// configure CORS to establish connection with frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowedOrigin", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

// configure authentication to protect endpoints
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration.GetSection("JWT_ISSUER").Get<string>(),
            ValidAudience = builder.Configuration.GetSection("JWT_AUDIENCE").Get<string>(),
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("JWT_KEY").Get<string>()!))   
        };
});

builder.Services.AddSingleton<JwtService>();
builder.Services.AddAuthorization();

var app = builder.Build();

app.UseCors("AllowedOrigin");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

// endpoints
app.MapUserEndpoints();
app.MapDeckEndpoints();
app.MapProfileEndpoints();
app.MapCardEndpoints();

app.Run();