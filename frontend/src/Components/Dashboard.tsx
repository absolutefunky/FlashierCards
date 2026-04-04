import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faICursor } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

function Dashboard() {
    const [toolbar, setToolbar] = useState(false);
    const [deck, setDeck] = useState("");
   
    function handleToolbarChange(event: boolean) {
        setToolbar(event);
    }

    function handleDeckChange(event: any) {
        setDeck(event.target.value);
        handleToolbarChange(true);
    }

    return (
        <div id="dashboard-content">
            <Navbar />
            <div>
                <div id="signup-title">Flashier Cards</div>
                <div id="toolbar">
                    <button onClick={() => handleToolbarChange(false)} style={{display: toolbar ? "flex" : "none"}} className="tool-option"><FontAwesomeIcon icon={faCircleXmark} /></button>
                    <Link className="tool-option" to="/"><FontAwesomeIcon icon={faPlus} /></Link>
                    <Link style={{display: toolbar ? "flex" : "none"}} className="tool-option" to="/study" title={deck}><FontAwesomeIcon icon={faFolderOpen} /></Link>
                    <Link style={{display: toolbar ? "flex" : "none"}} className="tool-option" to="/edit"><FontAwesomeIcon icon={faPencil} /></Link>
                    <Link style={{display: toolbar ? "flex" : "none"}} className="tool-option" to="/"><FontAwesomeIcon icon={faICursor} /></Link>
                    <button style={{display: toolbar ? "flex" : "none"}} className="tool-option"><FontAwesomeIcon icon={faTrash} /></button>
                </div>
                <form className="decks-list" action="">
                    <label>
                        SENG 645 Exam 1 Review
                        <input
                            type="radio"
                            name="deck" 
                            id="deck-1" 
                            value="SENG 645 Exam 1 Review"
                            checked={deck === "SENG 645 Exam 1 Review"}
                            onChange={handleDeckChange}
                        />
                    </label>
                    <label>
                        SENG 645 Exam 2 Review
                        <input
                            type="radio"
                            name="deck"
                            id="deck-2"
                            value="SENG 645 Exam 2 Review"
                            checked={deck === "SENG 645 Exam 2 Review"} 
                            onChange={handleDeckChange}
                        />
                    </label>
                    <label>
                        SENG 645 Exam 3 Review
                        <input
                            type="radio"
                            name="deck" 
                            id="deck-3" 
                            value="SENG 645 Exam 3 Review"
                            checked={deck === "SENG 645 Exam 3 Review"}
                            onChange={handleDeckChange}
                        />
                    </label>
                </form>
            </div>
        </div>
    );
}

export default Dashboard