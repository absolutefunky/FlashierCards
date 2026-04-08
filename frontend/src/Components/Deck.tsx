import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { useRef, useState } from "react";

function Deck() {
    const cardRef = useRef<HTMLDivElement>(null);
    let [card, setCard] = useState(1);
    const total = 5;
    let frontText = "Front of card " + card;
    let backText = "Back of card " + card;

    function flipCard() {
        if (cardRef.current) {
            cardRef.current.classList.toggle("flip");
        }
    }

    function showNextCard() {
        if ((card + 1) <= total) {
            card += 1;
            setCard(card);
        }
    }

    function showPrevCard() {
        if ((card - 1) >= 1) {
            card -= 1;
            setCard(card);
        }
    }

    return (
        <div className="deck">
            <div id="card" onClick={() => flipCard()} ref={cardRef}>
                <div id="card-inner">
                    <div id="card-front">{frontText}</div>
                    <div id="card-back">{backText}</div>
                </div>
            </div>
            <div id="deck-nav">
                <button disabled={card === 1} onClick={showPrevCard}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span>{card}/{total}</span>
                <button disabled={card === total} onClick={showNextCard}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
}

export default Deck