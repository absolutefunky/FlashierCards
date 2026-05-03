import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { useEffect, useRef, useState } from "react";
import styles from "../Styles/Deck.module.css";
import { useParams } from "react-router-dom";
import type Card from "../Interfaces/Card";

function Study() {
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
    const [deckName, setDeckName] = useState();
    const { userId, deckId } = useParams();
    const [frontCards, setFrontCards] = useState<Card[]>([{text: [], gif: [], sticker: []}]);
    const [backCards, setBackCards] = useState<Card[]>([{text: [], gif: [], sticker: []}]);
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardSide, setCardSide] = useState("Front");
    const [cardNum, setCardNum] = useState(1);
    const [total, setTotal] = useState(0);

    function flipCard() {
        if (cardRef.current) {
            cardRef.current.classList.toggle(styles.flip);
            setCardSide(prev => (prev === "Front") ? "Back" : "Front");
        }
    }

    function showNextCard() {
        if ((cardNum + 1) <= total) {
            if (cardSide === "Back") {
                flipCard();
            }
            setCardNum(cardNum + 1);
        }
    }

    function showPrevCard() {
        if ((cardNum - 1) >= 1) {
            if (cardSide === "Back") {
                flipCard();
            }
            setCardNum(cardNum - 1);
        }
    }

    const fetchDeckData = async () => {
        setLoading(true);

        try {
            // get deck data from supabase
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/decks/${deckId}`);

            // get message and deck data
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            // get card content from mongodb
            const docResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/decks/${deckId}/cards`);

            // get message and card content
            const docData = await docResponse.json();

            if (!docResponse.ok) {
                throw new Error(docData.message);
            }

            // set deck name content to display
            setDeckName(data.name);
            setFrontCards(docData.frontCards);
            setBackCards(docData.backCards);
            setTotal(docData.frontCards.length);
            
            setLoading(false);

        } catch(error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
        }
    }

    useEffect(() => {
        fetchDeckData()
    }, []);

    return (
        <div className={styles.dashboardContent}>
            <Navbar userId={userId} />
            <div>
                <div className={styles.title}>{deckName || "Flashier Cards"}</div>
                { (loading) ?
                    <div className={styles.invalidRequest}>
                        Loading request...
                    </div>
                :
                    (error.status) ?
                        <div className={styles.invalidRequest}>{error.message}</div>
                    :
                        <div></div>
                }
                <div className={styles.deck}>
                    <div className={styles.card} onClick={() => flipCard()} ref={cardRef}>
                        <div className={styles.cardInner}>
                            <div className={styles.cardFront}>
                                {frontCards[cardNum - 1].text.map((text, textId) =>
                                    <div 
                                        key={textId}
                                        style={{
                                            width: text.width + "px",
                                            color: text.color,
                                            fontSize: text.fontSize,
                                            fontFamily: "Imprima, sans-serif",
                                            position: "absolute",
                                            left: text.x + "px",
                                            top: text.y + "px"
                                        }}
                                    >
                                        {text.input}
                                    </div>
                                )}
                                {frontCards[cardNum - 1].gif.map((gif, gifId) =>
                                    <div 
                                        key={gifId}
                                        style={{
                                            width: gif.width + "px",
                                            height: gif.height + "px",
                                            position: "absolute",
                                            left: gif.x + "px",
                                            top: gif.y + "px"
                                        }}
                                    >
                                        {gif.url}
                                    </div>
                                )}
                                {frontCards[cardNum - 1].sticker.map((sticker, stickerId) =>
                                    <div 
                                        key={stickerId}
                                        style={{
                                            width: sticker.width + "px",
                                            height: sticker.height + "px",
                                            position: "absolute",
                                            left: sticker.x + "px",
                                            top: sticker.y + "px"
                                        }}
                                    >
                                        {sticker.url}
                                    </div>
                                )}
                            </div>
                            <div className={styles.cardBack}>
                                {backCards[cardNum - 1].text.map((text, textId) =>
                                    <div
                                        key={textId}
                                        style={{
                                            width: text.width + "px",
                                            color: text.color,
                                            fontSize: text.fontSize,
                                            fontFamily: "Imprima, sans-serif",
                                            position: "absolute",
                                            left: text.x + "px",
                                            top: text.y + "px"
                                        }}
                                    >
                                        {text.input}
                                    </div>
                                )}
                                {backCards[cardNum - 1].gif.map((gif, gifId) =>
                                    <div 
                                        key={gifId}
                                        style={{
                                            width: gif.width + "px",
                                            height: gif.height + "px",
                                            position: "absolute",
                                            left: gif.x + "px",
                                            top: gif.y + "px"
                                        }}
                                    >
                                        {gif.url}
                                    </div>
                                )}
                                {backCards[cardNum - 1].sticker.map((sticker, stickerId) =>
                                    <div 
                                        key={stickerId}
                                        style={{
                                            width: sticker.width + "px",
                                            height: sticker.height + "px",
                                            position: "absolute",
                                            left: sticker.x + "px",
                                            top: sticker.y + "px"
                                        }}
                                    >
                                        {sticker.url}
                                    </div>
                                )}
                            </div>
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

export default Study;