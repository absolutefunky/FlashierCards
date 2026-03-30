import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
    const [menuHidden, setMenuHidden] = useState(true);

    function showMenu() {
        setMenuHidden(!menuHidden);
    }

    return (
        <div className="menu">
            <button>
                <Link className="nav-link" to="#" onClick={showMenu}>
                    <FontAwesomeIcon icon={faBars} className="menu-icon" />
                    <span style={{display: menuHidden ? "none": "block"}} className="menu-text">Menu</span>
                </Link>
            </button>
            <button>
                <Link className="nav-link" to="/dashboard">
                    <FontAwesomeIcon icon={faFolder} className="menu-icon" />
                    <span style={{display: menuHidden ? "none": "block"}} className="menu-text">Decks</span>
                </Link>
            </button>
            <button>
                <Link className="nav-link" to="/profile">
                    <FontAwesomeIcon icon={faCircleUser} className="menu-icon" />
                    <span style={{display: menuHidden ? "none": "block"}} className="menu-text">Profile</span>
                </Link>
            </button>
            <button>
                <Link className="nav-link" to="/">
                    <FontAwesomeIcon icon={faRightFromBracket} className="menu-icon" />
                    <span style={{display: menuHidden ? "none": "block"}} className="menu-text">Log out</span>
                </Link>
            </button>            
        </div>
    );
}

export default Navbar;