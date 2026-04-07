import Navbar from "./Navbar";
import TextObject from "./TextObject";
import Deck from "./Deck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faBrush } from "@fortawesome/free-solid-svg-icons";
import { faT } from "@fortawesome/free-solid-svg-icons";
import { faBold } from "@fortawesome/free-solid-svg-icons";
import { faItalic } from "@fortawesome/free-solid-svg-icons";
import { faUnderline } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import React, { useRef, useState, type JSX } from "react";
import styles from "../Styles/Edit.module.css";

function Edit() {
    const [textTool, setTextTool] = useState(false);
    const [textObjects, setTextObjects] = useState<JSX.Element[]>([]);
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

    function addTextObject() {
        setTextTool(true);
        setTextObjects(prev => [...prev, <TextObject key={prev.length} />]);
    }

    return (
        <div id={styles.dashboardContent}>
            <Navbar />
            <div>
                <div id={styles.title}>Flashier Cards</div>
                <div id={styles.toolbar}>
                    <button className={styles.toolOption}><FontAwesomeIcon icon={faCircleXmark} /></button>
                    <button className={styles.toolOption}><FontAwesomeIcon icon={faPlus} /></button>
                    <button onClick={addTextObject} className={styles.toolOption}><FontAwesomeIcon icon={faT} /></button>
                    <button style={{display: textTool ? "flex" : "none"}} className={styles.toolOption}><FontAwesomeIcon icon={faBold} /></button>
                    <button style={{display: textTool ? "flex" : "none"}} className={styles.toolOption}><FontAwesomeIcon icon={faItalic} /></button>
                    <button style={{display: textTool ? "flex" : "none"}} className={styles.toolOption}><FontAwesomeIcon icon={faUnderline} /></button>
                    <button className={styles.toolOption}><FontAwesomeIcon icon={faBrush} /></button>
                    <button className={styles.toolOption}><FontAwesomeIcon icon={faImage} /></button>
                    <button className={styles.toolOption}><FontAwesomeIcon icon={faHeart} /></button>
                    <button className={styles.toolOption}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
                <div id={styles.deck}>
                    <div id={styles.deckNav}>
                        <button disabled={card === 1} onClick={showPrevCard}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <span>{card}/{total}</span>
                        <button disabled={card === total} onClick={showNextCard}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                    <div>
                        <div className={styles.card}>
                            {textObjects}
                        </div>
                        <div className={styles.card}>
                            back card
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit