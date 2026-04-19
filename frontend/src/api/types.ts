export interface Deck {
    id: number;
    userId: number;
    name: string;
    lastUpdated: string;
}

export interface TextObject {
    input: string;
    color: number;
    bold: boolean;
    italic: boolean;
    highlight: number;
    position: string;
}

export interface MediaObject {
    input: string;
    position: string;
}

export interface CardFace {
    backgroundColor: number;
    text: TextObject[];
    images: MediaObject[];
    gifs: MediaObject[];
    stickers: MediaObject[];
}

export interface Card {
    cardNumber: number;
    cardFront: CardFace;
    cardBack: CardFace;
}
