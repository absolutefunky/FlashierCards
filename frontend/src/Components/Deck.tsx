import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { useRef } from "react";

function Deck() {
    const cardRef = useRef<HTMLDivElement>(null);

    function flipCard() {
        if (cardRef.current) {
            cardRef.current.classList.toggle("flip");
        }
    }

    return (
        <div className="deck">
            <div id="card" onClick={() => flipCard()} ref={cardRef}>
                <div id="card-inner">
                    <div id="card-front">front of card</div>
                    <div id="card-back">back of card</div>
                </div>
            </div>
            <div id="deck-nav">
                <span><FontAwesomeIcon icon={faChevronLeft} /></span>
                <span>1/5</span>
                <span><FontAwesomeIcon icon={faChevronRight} /></span>
            </div>
        </div>
    );
}

export default Deck