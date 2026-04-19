import type { Card, CardFace, Deck } from "./types";

const BASE_URL = "http://localhost:5159";

// Decks
export async function getDecks(userId: number): Promise<Deck[]> {
    const res = await fetch(`${BASE_URL}/users/${userId}/decks`);
    return res.json();
}

export async function createDeck(userId: number, name: string): Promise<Deck> {
    const res = await fetch(`${BASE_URL}/users/${userId}/decks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, name }),
    });
    return res.json();
}

export async function renameDeck(userId: number, deckId: number, name: string): Promise<Deck> {
    const today = new Date().toISOString().split("T")[0];
    const res = await fetch(`${BASE_URL}/users/${userId}/decks/${deckId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, lastUpdated: today }),
    });
    return res.json();
}

export async function deleteDeck(userId: number, deckId: number): Promise<void> {
    await fetch(`${BASE_URL}/users/${userId}/decks/${deckId}`, { method: "DELETE" });
}

// Cards
export async function getCards(deckId: number): Promise<Card[]> {
    const res = await fetch(`${BASE_URL}/decks/${deckId}/cards`);
    if (res.status === 404) return [];
    return res.json();
}

export async function createCard(deckId: number, userId: number, cardNumber: number, cardFront: CardFace, cardBack: CardFace): Promise<Card> {
    const res = await fetch(`${BASE_URL}/decks/${deckId}/cards?userId=${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardNumber, cardFront, cardBack }),
    });
    return res.json();
}

export async function updateCard(deckId: number, cardNumber: number, cardFront: CardFace, cardBack: CardFace): Promise<Card> {
    const res = await fetch(`${BASE_URL}/decks/${deckId}/cards/${cardNumber}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardFront, cardBack }),
    });
    return res.json();
}

export async function deleteCard(deckId: number, cardNumber: number): Promise<void> {
    await fetch(`${BASE_URL}/decks/${deckId}/cards/${cardNumber}`, { method: "DELETE" });
}
