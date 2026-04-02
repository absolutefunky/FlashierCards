import Navbar from "./Navbar";
import Deck from "./Deck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

function Edit() {
    return (
        <div id="dashboard-content">
            <Navbar />
            <div>
                <div id="signup-title">Flashier Cards</div>
                <div id="toolbar">
                    <button className="tool-option"><FontAwesomeIcon icon={faCircleXmark} /></button>
                    <button className="tool-option"><FontAwesomeIcon icon={faPlus} /></button>
                    <button className="tool-option"><FontAwesomeIcon icon={faT} /></button>
                    <button className="tool-option"><FontAwesomeIcon icon={faBold} /></button>
                    <button className="tool-option"><FontAwesomeIcon icon={faItalic} /></button>
                    <button className="tool-option"><FontAwesomeIcon icon={faHighlighter} /></button>
                    <button className="tool-option"><FontAwesomeIcon icon={faBrush} /></button>
                    <button className="tool-option"><FontAwesomeIcon icon={faImage} /></button>
                    <button className="tool-option"><FontAwesomeIcon icon={faHeart} /></button>
                    <button className="tool-option"><FontAwesomeIcon icon={faTrash} /></button>
                </div>
                <Deck />
            </div>
        </div>
    );
}

export default Edit