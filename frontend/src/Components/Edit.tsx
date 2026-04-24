import Navbar from "./Navbar";
import TextObject from "./TextObject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faBrush, faT, faBold, faItalic, faUnderline, faPlus, faImage, faHeart, faTrash, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { useEffect, useRef, useState, type JSX } from "react";
import styles from "../Styles/Edit.module.css";
import { useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getCards, createCard, updateCard } from "../api/client";
import type { Card, CardFace, Deck } from "../api/types";

function Edit() {
    const { userId } = useUser();
    const location = useLocation();
    const deck = location.state?.deck as Deck | undefined;

    const [textTool, setTextTool] = useState(false);
    const [textObjects, setTextObjects] = useState<JSX.Element[]>([]);
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardIndex, setCardIndex] = useState(0);
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(false);

    const total = cards.length;
    const currentCard = cards[cardIndex] ?? null;

    useEffect(() => {
        if (!deck) return;
        setLoading(true);
        getCards(deck.id).then(fetched => {
            setCards(fetched);
            setLoading(false);
        });
    }, [deck]);

    function emptyFace(): CardFace {
        return { backgroundColor: 16777215, text: [], images: [], gifs: [], stickers: [] };
    }

    async function addCard() {
        if (!deck || !userId) return;
        const cardNumber = total + 1;
        const created = await createCard(deck.id, userId, cardNumber, emptyFace(), emptyFace());
        setCards(prev => [...prev, created]);
        setCardIndex(cards.length);
    }

    async function saveCard() {
        if (!deck || !currentCard) return;
        await updateCard(deck.id, currentCard.cardNumber, currentCard.cardFront, currentCard.cardBack);
    }

    function flipCard() {
        if (cardRef.current) {
            cardRef.current.classList.toggle("flip");
        }
    }

    function addTextObject() {
        setTextTool(true);
        setTextObjects(prev => [...prev, <TextObject key={prev.length} />]);
    }

    if (!deck) {
        return (
            <div id={styles.dashboardContent}>
                <Navbar />
                <div style={{ padding: "2rem" }}>No deck selected. Go back to the dashboard and select a deck.</div>
            </div>
        );
    }

    return (
        <div id={styles.dashboardContent}>
            <Navbar />
            <div>
                <div id={styles.title}>{deck.name}</div>
                <div id={styles.toolbar}>
                    <button className={styles.toolOption}><FontAwesomeIcon icon={faCircleXmark} /></button>
                    <button className={styles.toolOption} onClick={addCard}><FontAwesomeIcon icon={faPlus} /></button>
                    <button onClick={addTextObject} className={styles.toolOption}><FontAwesomeIcon icon={faT} /></button>
                    <button style={{display: textTool ? "flex" : "none"}} className={styles.toolOption}><FontAwesomeIcon icon={faBold} /></button>
                    <button style={{display: textTool ? "flex" : "none"}} className={styles.toolOption}><FontAwesomeIcon icon={faItalic} /></button>
                    <button style={{display: textTool ? "flex" : "none"}} className={styles.toolOption}><FontAwesomeIcon icon={faUnderline} /></button>
                    <button className={styles.toolOption}><FontAwesomeIcon icon={faBrush} /></button>
                    <button className={styles.toolOption}><FontAwesomeIcon icon={faImage} /></button>
                    <button className={styles.toolOption}><FontAwesomeIcon icon={faHeart} /></button>
                    <button className={styles.toolOption}><FontAwesomeIcon icon={faTrash} /></button>
                    <button className={styles.toolOption} onClick={saveCard} style={{ marginLeft: "auto", fontSize: "14px", padding: "0.5rem 1rem" }}>Save</button>
                </div>

                {loading ? <p>Loading cards...</p> : (
                    <div id={styles.deck}>
                        <div id={styles.deckNav}>
                            <button disabled={cardIndex === 0} onClick={() => setCardIndex(i => i - 1)}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <span>{total === 0 ? "0/0" : `${cardIndex + 1}/${total}`}</span>
                            <button disabled={cardIndex === total - 1 || total === 0} onClick={() => setCardIndex(i => i + 1)}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                        <div>
                            <div className={styles.card} ref={cardRef}>
                                {textObjects}
                                {currentCard?.cardFront.text.map((t, i) => (
                                    <div key={i} style={{ fontWeight: t.bold ? "bold" : "normal", fontStyle: t.italic ? "italic" : "normal" }}>{t.input}</div>
                                ))}
                            </div>
                            <div className={styles.card}>
                                {currentCard?.cardBack.text.map((t, i) => (
                                    <div key={i} style={{ fontWeight: t.bold ? "bold" : "normal", fontStyle: t.italic ? "italic" : "normal" }}>{t.input}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Edit;
