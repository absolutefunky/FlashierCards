using FlashierCards.Api.Endpoints;
using FlashierCards.Api.Models;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Supabase config
var url = builder.Configuration["Supabase:Url"];
var key = builder.Configuration["Supabase:Key"];

if (string.IsNullOrWhiteSpace(url) || string.IsNullOrWhiteSpace(key))
{
    throw new Exception("Supabase configuration is missing.");
}

var options = new Supabase.SupabaseOptions
{
    AutoRefreshToken = true,
    AutoConnectRealtime = true
};

var supabase = new Supabase.Client(url, key, options);
await supabase.InitializeAsync();

builder.Services.AddSingleton(supabase);

// MongoDB config
var mongoConnectionString = builder.Configuration["MongoDbSettings:ConnectionString"];
var mongoDatabaseName = builder.Configuration["MongoDbSettings:DatabaseName"];
var collection = builder.Configuration["MongoDbSettings:CollectionName"];

if (string.IsNullOrWhiteSpace(mongoConnectionString) || string.IsNullOrWhiteSpace(mongoDatabaseName))
{
    throw new Exception("MongoDB configuration is missing.");
}

builder.Services.AddSingleton<IMongoClient>(_ =>
    new MongoClient(mongoConnectionString));

builder.Services.AddSingleton(sp =>
{
    var client = sp.GetRequiredService<IMongoClient>();
    return client.GetDatabase(mongoDatabaseName);
});

builder.Services.AddSingleton<IMongoCollection<Card>>(sp =>
{
    var database = sp.GetRequiredService<IMongoDatabase>();
    return database.GetCollection<Card>(collection);
});

// CORS
var allowedOrigins = builder.Configuration
    .GetSection("AllowedOrigins")
    .Get<string[]>();

if (allowedOrigins is null || allowedOrigins.Length == 0)
{
    throw new Exception("AllowedOrigins configuration is missing.");
}

builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", policy => {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});


var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowAll");

app.MapUserEndpoints();
app.MapDeckEndpoints();
app.MapProfileEndpoints();
app.MapCardEndpoints();

app.Run();