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
                    <button
                        type="button"
                        onClick={() => showToolOptions(true)}
                        style={{ display: toolOptionHidden ? "none" : "inline-block" }}
                        className="pushable"
                    >
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front">
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </span>
                    </button>

                    <Link className="pushable" to="/">
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front">
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                    </Link>

                    <Link
                        style={{ display: toolOptionHidden ? "none" : "inline-block" }}
                        className="pushable"
                        to="/study"
                    >
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front">
                            <FontAwesomeIcon icon={faFolderOpen} />
                        </span>
                    </Link>

                    <Link
                        style={{ display: toolOptionHidden ? "none" : "inline-block" }}
                        className="pushable"
                        to="/edit"
                    >
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front">
                            <FontAwesomeIcon icon={faPencil} />
                        </span>
                    </Link>

                    <Link
                        style={{ display: toolOptionHidden ? "none" : "inline-block" }}
                        className="pushable"
                        to="/"
                    >
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front">
                            <FontAwesomeIcon icon={faICursor} />
                        </span>
                    </Link>

                    <button
                        type="button"
                        style={{ display: toolOptionHidden ? "none" : "inline-block" }}
                        className="pushable"
                    >
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front">
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                    </button>
                </div>

                <form className="decks-list" action="">
                    <input checked={toolOptionHidden === false} type="radio" id="deck-1" name="deck" />
                    <label onClick={() => showToolOptions(false)} htmlFor="deck-1">SENG 645 Exam 1 Review</label>

                    <input checked={toolOptionHidden === false} type="radio" id="deck-2" name="deck" />
                    <label onClick={() => showToolOptions(false)} htmlFor="deck-2">SENG 645 Exam 2 Review</label>

                    <input checked={toolOptionHidden === false} type="radio" id="deck-3" name="deck" />
                    <label onClick={() => showToolOptions(false)} htmlFor="deck-3">SENG 645 Exam 3 Review</label>
                </form>
            </div>
        </div>
    );
}

export default Dashboard;
