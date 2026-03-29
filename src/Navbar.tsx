import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [menuHidden, setMenuHidden] = useState(true);

    function showMenu() {
        setMenuHidden(!menuHidden);
    }

    return (
        <div className={`menu ${menuHidden ? 'notclicked' : 'clicked'}`}>
            <ul>
            <li onClick={showMenu}>
                <FontAwesomeIcon icon={faBars} className="menu-icon" />
                <span style={{display: menuHidden ? "none": "block"}} className="menu-text">Menu</span>
            </li>
            <li>
                <FontAwesomeIcon icon={faFolder} className="menu-icon" />
                <span style={{display: menuHidden ? "none": "block"}} className="menu-text">Decks</span>
            </li>
            <li>
                <Link to="/profile">
                    <FontAwesomeIcon icon={faCircleUser} className="menu-icon" />
                    <span style={{display: menuHidden ? "none": "block"}} className="menu-text">Profile</span>
                </Link>
            </li>
            <li>
                <FontAwesomeIcon icon={faRightFromBracket} className="menu-icon" />
                <span style={{display: menuHidden ? "none": "block"}} className="menu-text">Log out</span>
            </li>
            </ul>
        </div>
    );
}

export default Navbar;