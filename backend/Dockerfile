FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY FlashierCards.Api/FlashierCards.Api.csproj FlashierCards.Api/
RUN dotnet restore FlashierCards.Api/FlashierCards.Api.csproj
COPY . .
WORKDIR /src/FlashierCards.Api
RUN dotnet publish -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
COPY start.sh .
RUN chmod +x start.sh
ENTRYPOINT ["./start.sh"]
