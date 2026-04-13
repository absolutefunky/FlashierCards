using FlashierCards.Api.Endpoints;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// database url and public key from Supabase
var url = builder.Configuration["SUPABASE_URL"];
var key = builder.Configuration["SUPABASE_KEY"];

var options = new Supabase.SupabaseOptions
{
    AutoRefreshToken = true,
    AutoConnectRealtime = true
};

// creating supabase client
var supabase = new Supabase.Client(url!, key, options);
await supabase.InitializeAsync();

builder.Services.AddSingleton(supabase);

// creating mongodb client
var mongoUri = builder.Configuration["MONGODB_URI"];
var mongoClient = new MongoClient(mongoUri);
var mongodb = mongoClient.GetDatabase("flashiercards");

builder.Services.AddSingleton(mongodb);

var app = builder.Build();

// endpoints
app.MapUserEndpoints();
app.MapDeckEndpoints();
app.MapProfileEndpoints();
app.MapCardEndpoints();

app.Run();
