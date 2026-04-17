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
                        <Link style={{backgroundColor: "#003971"}} className={styles.profileOption} to="/profile/account-information">Account Information</Link>
                        <Link className={styles.profileOption} to="/profile/theme">Theme</Link>
                        <Link className={styles.profileOption} to="/profile/change-password">Change Password</Link>
                        <Link className={styles.profileOption} to="/profile/delete-account">Delete Account</Link>
                    </div>
                    <div>
                        <div className={styles.subtitle} style={{fontWeight: "600"}}>
                            Email
                        </div>
                        <div className={styles.profileText}>
                            enter email here
                        </div>
                        <div className={styles.subtitle} style={{fontWeight: "600"}}>
                            Date Account Created
                        </div>
                        <div className={styles.profileText}>
                            enter date here
                        </div>
                        <div className={styles.subtitle} style={{fontWeight: "600"}}>
                            Total Number of Decks
                        </div>
                        <div className={styles.profileText}>
                            enter number here
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountInformation