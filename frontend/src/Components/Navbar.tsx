import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../Styles/Navbar.module.css";
import { UserAuth } from "../AuthContext";

function Navbar() {
    const [menuHidden, setMenuHidden] = useState(true);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {session, signOutUser}: any = UserAuth();
    const navigate = useNavigate();

    function showMenu() {
        setMenuHidden(!menuHidden);
    }

    const handleSignOut = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await signOutUser();
            if (!response.success) {
                throw new Error("Invalid signout request.");
            }
            setLoading(false);
            navigate("/");
        } catch (error: any) {
            setLoading(false);
            setError(true);
            console.log(error.message);
        }
    };


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
            <button
                type="button"
                className={styles.navOption}
                onClick={handleSignOut}
            >
                <span><FontAwesomeIcon icon={faRightFromBracket} /></span>
                <span style={{display: menuHidden ? "none" : "block"}}>Logout</span>
            </button>
        </div>
    );
}

export default Navbar;