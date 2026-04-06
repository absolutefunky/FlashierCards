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

function Edit() {
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
        setTextObjects(prev => [...prev, <TextObject key={prev.length} />]);
    }

    return (
        <div id="dashboard-content">
            <Navbar />
            <div>
                <div id="signup-title">Flashier Cards</div>
                <div id="toolbar">
                    <button className="tool-option"><FontAwesomeIcon icon={faCircleXmark} /></button>
                    <button className="tool-option"><FontAwesomeIcon icon={faPlus} /></button>
                    <button onClick={addTextObject} className="tool-option"><FontAwesomeIcon icon={faT} /></button>
                    <button className="tool-option"><FontAwesomeIcon icon={faBold} /></button>
                    <button className="tool-option"><FontAwesomeIcon icon={faItalic} /></button>
                    <button className="tool-option"><FontAwesomeIcon icon={faUnderline} /></button>
                    <button className="tool-option"><FontAwesomeIcon icon={faBrush} /></button>
                    <button className="tool-option"><FontAwesomeIcon icon={faImage} /></button>
                    <button className="tool-option"><FontAwesomeIcon icon={faHeart} /></button>
                    <button className="tool-option"><FontAwesomeIcon icon={faTrash} /></button>
                </div>
                {/*<Deck />*/}
                <div className="deck">
                    <div id="card" onClick={() => flipCard()} ref={cardRef}>
                        <div id="card-inner">
                            <div id="card-front">{textObjects}</div>
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
            </div>
        </div>
    );
}

export default Edit