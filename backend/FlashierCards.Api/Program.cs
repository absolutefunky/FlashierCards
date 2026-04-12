using FlashierCards.Api.Endpoints;

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

var app = builder.Build();

// endpoints
app.MapUserEndpoints();
app.MapDeckEndpoints();
app.MapProfileEndpoints();

app.Run();
