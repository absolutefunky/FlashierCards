import Navbar from "./Navbar";
import TextObject from "./TextObject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faT } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faFill } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState, type JSX } from "react";
import styles from "../Styles/Deck.module.css";
import { useParams } from "react-router-dom";

function Edit() {
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
    const [deckName, setDeckName] = useState();
    const { userId, deckId } = useParams();
    const [textTool, setTextTool] = useState(false);
    const [textObjects, setTextObjects] = useState<JSX.Element[]>([]);

    const cardRef = useRef<HTMLDivElement>(null);
    const [cardSide, setCardSide] = useState("Front");
    const [cardNum, setCardNum] = useState(1);
    const total = 5;


    function flipCard() {
        if (cardRef.current) {
            cardRef.current.classList.toggle(styles.flip);
            setCardSide(prev => (prev === "Front") ? "Back" : "Front");
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

    function addTextObject() {
        setTextTool(true);
        setTextObjects(prev => [...prev, <TextObject key={prev.length} />]);
    }

    const fetchDeckData = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/decks/${deckId}`);

            // get message and deck data
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setDeckName(data.name);
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
                <div className={styles.title}>{deckName}</div>
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
                <div className={styles.toolbar}>
                    <button
                        type="button"
                        className={styles.toolOption}
                    >
                        <span className={styles.shadow}></span>
                        <span className={styles.edge}></span>
                        <span className={styles.front}>
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                    </button>
                    <button
                        type="button"
                        className={styles.toolOption}
                    >
                        <span className={styles.shadow}></span>
                        <span className={styles.edge}></span>
                        <span className={styles.front}>
                            <FontAwesomeIcon icon={faCircle} />
                        </span>
                    </button>
                    <button
                        type="button"
                        className={styles.toolOption}
                    >
                        <span className={styles.shadow}></span>
                        <span className={styles.edge}></span>
                        <span className={styles.front}>
                            <FontAwesomeIcon icon={faT} />
                        </span>
                    </button>
                    <button
                        type="button"
                        className={styles.toolOption}
                    >
                        <span className={styles.shadow}></span>
                        <span className={styles.edge}></span>
                        <span className={styles.front}>
                            <FontAwesomeIcon icon={faPen} />
                        </span>
                    </button>
                    <button
                        type="button"
                        className={styles.toolOption}
                    >
                        <span className={styles.shadow}></span>
                        <span className={styles.edge}></span>
                        <span className={styles.front}>
                            <FontAwesomeIcon icon={faHeart} />
                        </span>
                    </button>
                    <button
                        type="button"
                        className={styles.toolOption}
                    >
                        <span className={styles.shadow}></span>
                        <span className={styles.edge}></span>
                        <span className={styles.front}>
                            <FontAwesomeIcon icon={faFill} />
                        </span>
                    </button>
                    <button
                        type="button"
                        className={styles.toolOption}
                    >
                        <span className={styles.shadow}></span>
                        <span className={styles.edge}></span>
                        <span className={styles.front}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                    </button>
                    <button
                        type="button"
                        className={styles.toolOption}
                        onClick={() => flipCard()}
                    >
                        <span className={styles.shadow}></span>
                        <span className={styles.edge}></span>
                        <span className={styles.front}>
                            <FontAwesomeIcon icon={faRightLeft} />
                        </span>
                    </button>
                </div>
                <div className={styles.deck}>
                    <div className={styles.card} ref={cardRef}>
                        <div className={styles.cardInner}>
                            <div className={styles.cardFront}>Front of card</div>
                            <div className={styles.cardBack}>Back of card</div>
                        </div>
                    </div>
                    <div className={styles.deckNav}>
                        <button disabled={cardNum === 1} onClick={showPrevCard}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <span>{cardSide} of Card {cardNum}/{total}</span>
                        <button disabled={cardNum === total} onClick={showNextCard}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit