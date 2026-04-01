import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { useRef } from "react";

// deck component part of study component
function Deck() {
    /*
    const name = "SENG 645 Exam 1";
    const number = 1;
    const total = 5;
    const front = "Front of card " + number;
    const back = "Back of card " + number;
    const cardRef = useRef<HTMLDivElement>(null);

    function flipCard() {
        if (cardRef.current) {
            cardRef.current.classList.toggle("flip");
        }
    }*/

    return (
        <div>deck view</div>
        /*
        <div className="main-content">
            <div className="title">{name}</div>
            <div className="study-deck">
                <div onClick={() => flipCard()} ref={cardRef} id="study-card">
                    <div id="study-card-inner">
                        <div id="study-card-front">{front}</div>
                        <div id="study-card-back">{back}</div>
                    </div>
                </div>
                <div id="deck-nav">
                    <span><FontAwesomeIcon icon={faChevronLeft} /></span>
                    <span>{number}/{total}</span>
                    <span><FontAwesomeIcon icon={faChevronRight} /></span>
                </div>
            </div>
        </div>*/
    );
}

export default Deck;