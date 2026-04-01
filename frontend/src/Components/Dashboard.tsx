import Navbar from "./Navbar"
import { useState } from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
    return (
        <div id="dashboard-content">
            <div id="navbar">
                <Link className="nav-option" to="/dashboard">
                    <span><FontAwesomeIcon icon={faBars} className="menu-icon" /></span>
                    <span>Menu</span>
                </Link>
                <Link style={{backgroundColor: "#004A94", border: "2px solid #004A94", color: "white"}} className="nav-option" to="/dashboard">
                    <span><FontAwesomeIcon icon={faFolder} className="menu-icon" /></span>
                    <span>Decks</span>
                </Link>
                <Link className="nav-option" to="/profile">
                    <span><FontAwesomeIcon icon={faCircleUser} className="menu-icon" /></span>
                    <span>Profile</span>
                </Link>
                <Link className="nav-option" to="/">
                    <span><FontAwesomeIcon icon={faRightFromBracket} className="menu-icon" /></span>
                    <span>Log out</span>
                </Link>
            </div>
            <div>
                dashboard content
            </div>
        </div>
    );
}

/*
function Dashboard() {
  
    const [deckClicked, setdeckClicked] = useState<string | null>(null);

    return (
        <div>dashboard view</div>
        
        <div className="dashboard-main">
            <Navbar />
            <div className="dashboard-content">
                <div className="dashboard-title">Flashier Cards</div>
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