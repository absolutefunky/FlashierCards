import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from 'react';
import styles from "../Styles/Profile.module.css";

function DeleteAccount() {
	const [showOverlay, setShowOverlay] = useState(false);
	const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	function showProfileOverlay(request: boolean) {
        setShowOverlay(request);
    }

	const deleteUserData = async () => {
		showProfileOverlay(false);
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/1/delete`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Invalid request.");
            }
			setSuccess(true);
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            setError(true);
            console.log(error.message);
        }
    };
	
    return (
		<div id={styles.dashboardContent} style={{pointerEvents: showOverlay ? "none" : "auto"}}>
            <Navbar />
            <div>
                <div id={styles.title}>Flashier Cards</div>
                <div id={styles.profileContent}>
                    <div>
                        <Link className={styles.profileOption} to="/profile/account-information">Account Information</Link>
                        <Link className={styles.profileOption} to="/profile/theme">Theme</Link>
                        <Link className={styles.profileOption} to="/profile/change-password">Change Password</Link>
                        <Link style={{backgroundColor: "#003971"}} className={styles.profileOption} to="/profile/delete-account">Delete Account</Link>
                    </div>
                    <div>
						<div>
							{ (isLoading) ?
								<div className={styles.invalidRequest}>
									Loading request...
								</div>
							:
								(error) ?
									<div className={styles.invalidRequest}>
										Invalid request.
									</div>
								:
									(success) ?
										<div className={styles.invalidRequest}>
											Your account has been deleted. Please log out.
										</div>
									:
										<div></div>
							}
							<div className={styles.profileText}>If you no longer wish to use Flashier Cards, you can permanently delete your account.</div>
							<button
								className={styles.homeBtn}
								onClick={() => showProfileOverlay(true)}
								style={{marginTop: "0.5rem"}}
							>
								<span className={styles.loginShadow}></span>
								<span className={styles.loginEdge}></span>
								<span className={styles.loginFront}>Delete account</span>
							</button>
						</div>
						<div style={{display: showOverlay ? "flex" : "none"}}  className={styles.overlay}>
							<div className={styles.subtitle} style={{fontWeight: "600"}}>Delete My Account</div>
							<div className={styles.profileText}>
								Are you sure you want to delete your account? This action cannot be undone.
							</div>
							<div style={{marginTop: "0.5rem"}}>
								<button
									className={styles.homeBtn}
									style={{marginRight: "1rem"}}
									type="button"
									onClick={deleteUserData}
								>
									<span className={styles.signupShadow}></span>
									<span className={styles.signupEdge}></span>
									<span className={styles.signupFront}><FontAwesomeIcon icon={faCheck} /></span>
								</button>
								<button
									className={styles.homeBtn}
									type="button"
									onClick={() => showProfileOverlay(false)}
								>
									<span className={styles.loginShadow}></span>
									<span className={styles.loginEdge}></span>
									<span className={styles.xFront}><FontAwesomeIcon icon={faX} /></span>
								</button>
							</div>
						</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccount
