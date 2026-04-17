namespace FlashierCards.Api.Endpoints;

public static class DeckEndpoints
{
    public static void MapDeckEndpoints(this WebApplication app)
    {

        // GET /users/{id}/decks
        // use ReturnDeckDto to return a collection of decks

        // POST /users/{id}/decks/create
        // use CreateDeckDto for request data
        // use ReturnDeckDto to return data

        // PUT /users/{userId}/decks/{id}/rename
        // use UpdateDeckDto for request data
        // use ReturnDeckTo return data

        // DELETE /users/{userId}/decks/{id}/delete
        // return respose.ok or something depending on status
    }
}
