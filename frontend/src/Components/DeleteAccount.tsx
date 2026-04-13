import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useState } from 'react';
import styles from "../Styles/Profile.module.css";

function DeleteAccount() {
	const [showOverlay, setShowOverlay] = useState(false);

	function showProfileOverlay(request: boolean) {
        setShowOverlay(request);
    }
	
    return (
		<div id={styles.dashboardContent}>
            <Navbar />
            <div>
                <div id={styles.title}>Flashier Cards</div>
                <div id={styles.profileContent}>
                    <div>
                        <Link className={styles.profileOption} to="/profile/account-information">Account Information</Link>
                        <Link className={styles.profileOption} to="/profile/theme">Theme</Link>
                        <Link className={styles.profileOption} to="/profile/change-password">Change Password</Link>
                        <Link style={{backgroundColor: "#D9EDF8", color: "#004A94"}} className={styles.profileOption} to="/profile/delete-account">Delete Account</Link>
                    </div>
                    <div>
						<div>
							<div className={styles.profileText}>If you no longer wish to use Flashier Cards, you can permanently delete your account.</div>
							<button
								className={styles.homeBtn}
								onClick={() => showProfileOverlay(true)}
							>
								<span className={styles.loginShadow}></span>
								<span className={styles.loginEdge}></span>
								<span className={styles.loginFront}>Delete My Account</span>
							</button>
						</div>
						<div style={{display: showOverlay ? "flex" : "none"}}  className={styles.overlay}>
							<div className={styles.cancelAction}><FontAwesomeIcon icon={faCircleXmark} onClick={() => showProfileOverlay(false)} /></div>
							<div className={styles.subtitle} style={{fontWeight: "600"}}>Delete My Account</div>
							<div className={styles.profileText}>Are you sure you want to delete your account? This action cannot be undone.</div>
							<form id={styles.signupForm}>
								<div>
									<div className={styles.subtitle}>Enter your password to confirm.</div>
									<input type="password" />
								</div>
								<button
									className={styles.homeBtn}
								>
									<span className={styles.loginShadow}></span>
									<span className={styles.loginEdge}></span>
									<span className={styles.loginFront}>Delete</span>
								</button>
							</form>
						</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccount
