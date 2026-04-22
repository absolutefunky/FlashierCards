import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFolder, faCircleUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../Styles/Navbar.module.css";

type NavbarProps = {
    userId?: string;
};

function Navbar({ userId }: NavbarProps) {
    const [menuHidden, setMenuHidden] = useState(true);
    const navigate = useNavigate();

    function showMenu() {
        setMenuHidden(prev => !prev);
    }

    function handleDeck() {
        if (!userId) return;
        navigate(`/dashboard/${userId}`);
    }

    function handleProfile() {
        if (!userId) return;
        navigate(`/profile/${userId}/account-information`);
    }

    function handleLogout() {
        navigate(`/`, { replace: true });
    }

    return (
        <div id={styles.navbar}>
            <button className={styles.navOption} onClick={showMenu}>
                <span><FontAwesomeIcon icon={faBars} /></span>
                <span style={{ display: menuHidden ? "none" : "block" }}>Menu</span>
            </button>

            <button className={styles.navOption} onClick={handleDeck} disabled={!userId}>
                <span><FontAwesomeIcon icon={faFolder} /></span>
                <span style={{ display: menuHidden ? "none" : "block" }}>Decks</span>
            </button>

            <button className={styles.navOption} onClick={handleProfile} disabled={!userId}>
                <span><FontAwesomeIcon icon={faCircleUser} /></span>
                <span style={{ display: menuHidden ? "none" : "block" }}>Profile</span>
            </button>

            <button className={styles.navOption} onClick={handleLogout}>
                <span><FontAwesomeIcon icon={faRightFromBracket} /></span>
                <span style={{ display: menuHidden ? "none" : "block" }}>Logout</span>
            </button>
        </div>
    );
}

export default Navbar;