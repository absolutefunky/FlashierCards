import type Profile from "../Interfaces/Profile";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import styles from "../Styles/Profile.module.css";

function AccountInformation() {
    return (
        <div id={styles.dashboardContent}>
            <Navbar />
            <div>
                <div id={styles.title}>Flashier Cards</div>
                <div id={styles.profileContent}>
                    <div>
                        <Link style={{backgroundColor: "#D9EDF8", color: "#004A94"}} className={styles.profileOption} to="/profile/account-information">Account Information</Link>
                        <Link className={styles.profileOption} to="/profile/theme">Theme</Link>
                        <Link className={styles.profileOption} to="/profile/change-password">Change Password</Link>
                        <Link className={styles.profileOption} to="/profile/delete-account">Delete Account</Link>
                    </div>
                    <div id={styles.profileInfo}>
                        add user email, date account created, and number of decks here
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountInformation