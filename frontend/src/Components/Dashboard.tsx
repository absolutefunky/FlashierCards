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
    return (
        <div id="dashboard-content">
            <Navbar />
            <div>
                <div id="signup-title">Flashier Cards</div>
                <div id="toolbar">
                    <button className="tool-option"><FontAwesomeIcon icon={faCircleXmark} /></button>
                    <Link className="tool-option" to="/"><FontAwesomeIcon icon={faPlus} /></Link>
                    <Link className="tool-option" to="/study"><FontAwesomeIcon icon={faFolderOpen} /></Link>
                    <Link className="tool-option" to="/edit"><FontAwesomeIcon icon={faPencil} /></Link>
                    <Link className="tool-option" to="/"><FontAwesomeIcon icon={faICursor} /></Link>
                    <button className="tool-option"><FontAwesomeIcon icon={faTrash} /></button>
                </div>
                <form id="dashboard-form" action="">
                    <input type="radio" id="deck-1" />
                    <label htmlFor="deck-1">SENG 645 Exam 1 Review</label>
                    <input type="radio" id="deck-2" />
                    <label htmlFor="deck-2">SENG 645 Exam 2 Review</label>
                    <input type="radio" id="deck-3" />
                    <label htmlFor="deck-3">SENG 645 Exam 3 Review</label>
                </form>
            </div>
        </div>
    );
}

/*
function Dashboard() {
  
    const [deckClicked, setdeckClicked] = useState<string | null>(null);

    return (
      
        <div className="dashboard-main">
            
            <div className="dashboard-content">
                
                <nav className='toolbar'>
                    {( !deckClicked &&
                        <>
                            <button>Create</button>
                        </>
                    )}
                    {( deckClicked &&
                        <>
                            <button>
                                <Link to="/study">Study</Link>
                            </button>
                             <button>
                                <Link to="/edit">Edit</Link>
                            </button>
                            <button>Rename</button>
                            <button>Delete</button>
                            <button onClick={() => setdeckClicked(null)}>Cancel</button>
                        </>
                    )}
                </nav>
                <form className='decks-list'>
                    <input type="radio" id="deck1" name="deck" checked={deckClicked=== "deck1"} onChange={() => setdeckClicked("deck1")}/>
                        <label htmlFor='deck1'>SENG 645 Exam 1</label>
                    <input type="radio" id="deck2" name="deck" checked={deckClicked === "deck2"} onChange={() => setdeckClicked("deck2")}/>
                        <label htmlFor='deck2'>SENG 645 Exam 1</label>
                    <input type="radio" id="deck3" name="deck" checked={deckClicked=== "deck3"}
                    onChange={() => setdeckClicked("deck3")}/>
                        <label htmlFor='deck3'>SENG 645 Exam 1</label>
                </form>
            </div>
        </div>
    );

};*/

export default Dashboard