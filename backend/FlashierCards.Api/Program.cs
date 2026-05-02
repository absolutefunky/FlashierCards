using FlashierCards.Api.Endpoints;
using FlashierCards.Api.Models;
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

// creating MongoDb client to establish connection with database
builder.Services.AddSingleton<IMongoCollection<Card>>(_ =>
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
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowedOrigin");
app.UseHttpsRedirection();

// endpoints
app.MapUserEndpoints();
app.MapDeckEndpoints();
app.MapProfileEndpoints();
app.MapCardEndpoints();

app.Run();
