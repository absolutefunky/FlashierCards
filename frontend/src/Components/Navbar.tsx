import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../Styles/Navbar.module.css";

function Navbar({userId}: any) {
    const [menuHidden, setMenuHidden] = useState(true);
    const navigate = useNavigate();

    function showMenu() {
        setMenuHidden(!menuHidden);
    }

    function handleDeck() {
        navigate(`/dashboard/${userId}`);
    }

    function handleProfile() {
        navigate(`/profile/${userId}/accountInformation`);
    }

    function handleLogout() {
        navigate(`/`, {replace: true});
    }

    return (
        <div id={styles.navbar}>
            <button className={styles.navOption} onClick={() => {showMenu()}}>
                <span><FontAwesomeIcon icon={faBars} /></span>
                <span style={{display: menuHidden ? "none" : "block"}}>Menu</span>
            </button>
            <button className={styles.navOption} onClick={handleDeck}>
                <span><FontAwesomeIcon icon={faFolder} /></span>
                <span style={{display: menuHidden ? "none" : "block"}}>Decks</span>
            </button>
            <button className={styles.navOption} onClick={handleProfile}>
                <span><FontAwesomeIcon icon={faCircleUser} /></span>
                <span style={{display: menuHidden ? "none" : "block"}}>Profile</span>
            </button>
            <button className={styles.navOption} onClick={handleLogout}>
                <span><FontAwesomeIcon icon={faRightFromBracket} /></span>
                <span style={{display: menuHidden ? "none" : "block"}}>Logout</span>
            </button>
        </div>
    );
}

export default Navbar;