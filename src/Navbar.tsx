import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { useState } from "react";

function Navbar() {
    const [menuHidden, setMenuHidden] = useState(true);

    function showMenu() {
        setMenuHidden(!menuHidden);
    }

    return (
        <div className="menu">
            <button onClick={showMenu}>
                <FontAwesomeIcon icon={faBars} className="menu-icon" />
                <span style={{display: menuHidden ? "none": "block"}} className="menu-text">Menu</span>
            </button>
            <button>
                <FontAwesomeIcon icon={faFolder} className="menu-icon" />
                <span style={{display: menuHidden ? "none": "block"}} className="menu-text">Decks</span>
            </button>
            <button>
                <FontAwesomeIcon icon={faCircleUser} className="menu-icon" />
                <span style={{display: menuHidden ? "none": "block"}} className="menu-text">Profile</span>
            </button>
            <button>
                <FontAwesomeIcon icon={faRightFromBracket} className="menu-icon" />
                <span style={{display: menuHidden ? "none": "block"}} className="menu-text">Log out</span>
            </button>
        </div>
    );
}

export default Navbar;