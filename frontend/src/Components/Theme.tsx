import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import styles from "../Styles/Profile.module.css";

function Theme() {
    return (
        <div id={styles.dashboardContent}>
            <Navbar />
            <div>
                <div id={styles.title}>Flashier Cards</div>
                <div id={styles.profileContent}>
                    <div>
                        <Link className={styles.profileOption} to="/profile/account-information">Account Information</Link>
                        <Link style={{backgroundColor: "#003971"}} className={styles.profileOption} to="/profile/theme">Theme</Link>
                        <Link className={styles.profileOption} to="/profile/change-password">Change Password</Link>
                        <Link className={styles.profileOption} to="/profile/delete-account">Delete Account</Link>
                    </div>
                    <div>
                        add content here
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Theme