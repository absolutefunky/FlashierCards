using FlashierCards.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// database url and public key from Supabase
var url = builder.Configuration.GetConnectionString("SUPABASE_URL");
var key = builder.Configuration.GetConnectionString("SUPABASE_KEY");

var options = new Supabase.SupabaseOptions
{
    AutoRefreshToken = true,
    AutoConnectRealtime = true
};

// creating supabase client to establish connection with database
var supabase = new Supabase.Client(url!, key, options);
await supabase.InitializeAsync();

builder.Services.AddSingleton(supabase);

// configure CORS to establish connection with frontend
var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(optionsCORS =>
    {
        optionsCORS.WithOrigins(allowedOrigins!).AllowAnyMethod().AllowAnyHeader();   
    });
});

var app = builder.Build();

app.UseCors();

// endpoints
app.MapUserEndpoints();
app.MapDeckEndpoints();
app.MapProfileEndpoints();

app.Run();
