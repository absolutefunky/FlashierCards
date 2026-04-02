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
    const [toolOptionHidden, setToolOptionHidden] = useState(true);

    function showToolOptions(request: boolean) {
        setToolOptionHidden(request);
    }

    return (
        <div id="dashboard-content">
            <Navbar />
            <div>
                <div id="signup-title">Flashier Cards</div>
                <div id="toolbar">
                    <button onClick={() => {showToolOptions(true)}} style={{display: toolOptionHidden ? "none" : "flex"}} className="tool-option"><FontAwesomeIcon icon={faCircleXmark} /></button>
                    <Link className="tool-option" to="/"><FontAwesomeIcon icon={faPlus} /></Link>
                    <Link style={{display: toolOptionHidden ? "none" : "flex"}} className="tool-option" to="/study"><FontAwesomeIcon icon={faFolderOpen} /></Link>
                    <Link style={{display: toolOptionHidden ? "none" : "flex"}} className="tool-option" to="/edit"><FontAwesomeIcon icon={faPencil} /></Link>
                    <Link style={{display: toolOptionHidden ? "none" : "flex"}} className="tool-option" to="/"><FontAwesomeIcon icon={faICursor} /></Link>
                    <button style={{display: toolOptionHidden ? "none" : "flex"}} className="tool-option"><FontAwesomeIcon icon={faTrash} /></button>
                </div>
                <form className="decks-list" action="">
                    <input checked={toolOptionHidden === false} type="radio" id="deck-1" name="deck" />
                    <label onClick={() => {showToolOptions(false)}} htmlFor="deck-1">SENG 645 Exam 1 Review</label>
                    <input checked={toolOptionHidden === false} type="radio" id="deck-2" name="deck" />
                    <label onClick={() => {showToolOptions(false)}} htmlFor="deck-2">SENG 645 Exam 2 Review</label>
                    <input checked={toolOptionHidden === false} type="radio" id="deck-3" name="deck" />
                    <label onClick={() => {showToolOptions(false)}} htmlFor="deck-3">SENG 645 Exam 3 Review</label>
                </form>
            </div>
        </div>
    );
}

export default Dashboard