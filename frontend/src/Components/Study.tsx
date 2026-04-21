import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { useRef, useState } from "react";
import styles from "../Styles/Deck.module.css";
import { useParams } from "react-router-dom";

function Study() {
    const { deckId } = useParams();
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardNum, setCardNum] = useState(1);
    const total = 5;

    function flipCard() {
        if (cardRef.current) {
            cardRef.current.classList.toggle(styles.flip);
        }
    }

    function showNextCard() {
        if ((cardNum + 1) <= total) {
            setCardNum(cardNum + 1);
        }
    }

    function showPrevCard() {
        if ((cardNum - 1) >= 1) {
            setCardNum(cardNum - 1);
        }
    }

    return (
        <div className={styles.dashboardContent}>
            <Navbar />
            <div>
                <div className={styles.title}>Flashier Cards</div>
                <div>{deckId}</div>
                <div className={styles.deck}>
                    <div className={styles.card} onClick={() => flipCard()} ref={cardRef}>
                        <div className={styles.cardInner}>
                            <div className={styles.cardFront}>Front of card</div>
                            <div className={styles.cardBack}>Back of card</div>
                        </div>
                    </div>
                    <div className={styles.deckNav}>
                        <button disabled={cardNum === 1} onClick={showPrevCard}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <span>{cardNum}/{total}</span>
                        <button disabled={cardNum === total} onClick={showNextCard}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Study