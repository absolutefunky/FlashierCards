#!/bin/sh
echo "=== /app contents ==="
ls -la /app
echo "=== running dotnet ==="
exec dotnet FlashierCards.Api.dll --urls "http://+:$PORT"
