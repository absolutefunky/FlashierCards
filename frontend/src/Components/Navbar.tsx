import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../Styles/Navbar.module.css";

function Navbar() {
    const [menuHidden, setMenuHidden] = useState(true);

    function showMenu() {
        setMenuHidden(!menuHidden);
    }

    return (
        <div id={styles.navbar}>
            <button className={styles.navOption} onClick={() => {showMenu()}}>
                <span><FontAwesomeIcon icon={faBars} /></span>
                <span style={{display: menuHidden ? "none" : "block"}}>Menu</span>
            </button>
            <Link className={styles.navOption} to="/dashboard">
                <span><FontAwesomeIcon icon={faFolder} /></span>
                <span style={{display: menuHidden ? "none" : "block"}}>Decks</span>
            </Link>
            <Link className={styles.navOption} to="/profile/account-information">
                <span><FontAwesomeIcon icon={faCircleUser} /></span>
                <span style={{display: menuHidden ? "none" : "block"}}>Profile</span>
            </Link>
            <Link className={styles.navOption} to="/">
                <span><FontAwesomeIcon icon={faRightFromBracket} /></span>
                <span style={{display: menuHidden ? "none" : "block"}}>Logout</span>
            </Link>
        </div>
    );
}

export default Navbar