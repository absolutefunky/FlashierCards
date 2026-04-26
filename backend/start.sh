#!/bin/sh
exec dotnet FlashierCards.Api.dll --urls "http://+:$PORT"
