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
                        <div className={styles.subtitle} style={{fontWeight: "600"}}>Background Animations</div>
                        <div id={styles.profileThemes}>
                            <div>add animation 1 here</div>
                            <div>add animation 2 here</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Theme