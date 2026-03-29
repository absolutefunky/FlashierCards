import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faBrush } from "@fortawesome/free-solid-svg-icons";
import { faT } from "@fortawesome/free-solid-svg-icons";
import { faBold } from "@fortawesome/free-solid-svg-icons";
import { faItalic } from "@fortawesome/free-solid-svg-icons";
import { faHighlighter } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { useRef } from "react";

// deck component part of edit component
function EditDeck() {
    const name = "SENG 645 Exam 1";
    const number = 1;
    const total = 5;
    const cardRef = useRef<HTMLDivElement>(null);
    
    function flipCard() {
        if (cardRef.current) {
            cardRef.current.classList.toggle("flip");
        }
    }

    return (
        <div className="main-content">
            <div className="title">{name}</div>
            <div className="toolbar">
                <button><FontAwesomeIcon icon={faCircleXmark} /></button>
                <button><FontAwesomeIcon icon={faArrowPointer} /></button>
                <button><FontAwesomeIcon icon={faPlus} /></button>
                <button><FontAwesomeIcon icon={faT} /></button>
                <button><FontAwesomeIcon icon={faBold} /></button>
                <button><FontAwesomeIcon icon={faItalic} /></button>
                <button><FontAwesomeIcon icon={faHighlighter} /></button>
                <button><FontAwesomeIcon icon={faBrush} /></button>
                <button><FontAwesomeIcon icon={faTrash} /></button>
                <button><FontAwesomeIcon icon={faImage} /></button>
                <button><FontAwesomeIcon icon={faHeart} /></button>
            </div>
            <div className="edit-deck">
                <div onClick={() => flipCard()} ref={cardRef} id="edit-card">
                    <div id="edit-card-inner">
                        <div id="edit-card-front">front of card</div>
                        <div id="edit-card-back">back of card</div>
                    </div>
                </div>
                <div id="deck-nav">
                    <span><FontAwesomeIcon icon={faChevronLeft} /></span>
                    <span>{number}/{total}</span>
                    <span><FontAwesomeIcon icon={faChevronRight} /></span>
                </div>
            </div>
        </div>
    );
}

export default EditDeck;