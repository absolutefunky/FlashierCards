import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const [menuHidden, setMenuHidden] = useState(true);

    function showMenu() {
        setMenuHidden(!menuHidden);
    }

    return (
        <div id="navbar">
            <button onClick={() => {showMenu()}}>
                <span><FontAwesomeIcon icon={faBars} /></span>
                <span style={{display: menuHidden ? "none" : "block"}}>Menu</span>
            </button>
            <button>
                <Link className="nav-option" to="/dashboard">
                    <span><FontAwesomeIcon icon={faFolder} /></span>
                    <span style={{display: menuHidden ? "none" : "block"}}>Decks</span>
                </Link>
            </button>
            <button>
                <Link className="nav-option" to="/profile">
                    <span><FontAwesomeIcon icon={faCircleUser} /></span>
                    <span style={{display: menuHidden ? "none" : "block"}}>Profile</span>
                </Link>
            </button>
            <button>
                <Link className="nav-option" to="/">
                    <span><FontAwesomeIcon icon={faRightFromBracket} /></span>
                    <span style={{display: menuHidden ? "none" : "block"}}>Logout</span>
                </Link>
            </button>
        </div>
    );
}

export default Navbar