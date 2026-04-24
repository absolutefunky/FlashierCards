import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCards } from "../api/client";
import type { Card, Deck } from "../api/types";

function DeckViewer() {
    const location = useLocation();
    const deck = location.state?.deck as Deck | undefined;

    const cardRef = useRef<HTMLDivElement>(null);
    const [cardIndex, setCardIndex] = useState(0);
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(false);

    const total = cards.length;
    const currentCard = cards[cardIndex] ?? null;

    useEffect(() => {
        if (!deck) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        getCards(deck.id).then(fetched => {
            setCards(fetched);
            setLoading(false);
        });
    }, [deck]);

    function flipCard() {
        if (cardRef.current) {
            cardRef.current.classList.toggle("flip");
        }
    }

    if (!deck) return <p>No deck selected.</p>;
    if (loading) return <p>Loading cards...</p>;
    if (total === 0) return <p>This deck has no cards yet.</p>;

    return (
        <div className="deck">
            <div id="card" onClick={flipCard} ref={cardRef}>
                <div id="card-inner">
                    <div id="card-front">
                        {currentCard?.cardFront.text.map((t, i) => (
                            <span key={i} style={{ fontWeight: t.bold ? "bold" : "normal", fontStyle: t.italic ? "italic" : "normal" }}>{t.input}</span>
                        ))}
                    </div>
                    <div id="card-back">
                        {currentCard?.cardBack.text.map((t, i) => (
                            <span key={i} style={{ fontWeight: t.bold ? "bold" : "normal", fontStyle: t.italic ? "italic" : "normal" }}>{t.input}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div id="deck-nav">
                <button disabled={cardIndex === 0} onClick={() => setCardIndex(i => i - 1)}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span>{cardIndex + 1}/{total}</span>
                <button disabled={cardIndex === total - 1} onClick={() => setCardIndex(i => i + 1)}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
}

export default DeckViewer;
