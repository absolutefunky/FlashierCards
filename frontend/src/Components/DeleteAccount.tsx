import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';
import styles from "../Styles/Profile.module.css";

function DeleteAccount() {
	const { userId } = useParams();
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
	const [showOverlay, setShowOverlay] = useState(false);
    const navigate = useNavigate();
	
	function showProfileOverlay(request: boolean) {
        setShowOverlay(request);
    }

	const deleteUserData = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/delete`, {
                method: "DELETE"
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setLoading(false);
            showProfileOverlay(false);
			navigate(`/`, {replace: true});

        } catch(error: any) {
            setLoading(false);
            showProfileOverlay(false);
            setError({status: true, message: error.message});
        }
    }

	function handleAccountInformation() {
        navigate(`/profile/${userId}/accountInformation`);
    }

    function handleTheme() {
        navigate(`/profile/${userId}/theme`);
    }

    function handleChangePassword() {
        navigate(`/profile/${userId}/changePassword`);
    }

    function handleDeleteAccount() {
        navigate(`/profile/${userId}/deleteAccount`);
    }
	
    return (
		<div id={styles.dashboardContent} style={{pointerEvents: showOverlay ? "none" : "auto"}}>
            <Navbar userId={userId} />
            <div>
                <div id={styles.title}>Flashier Cards</div>
                <div id={styles.profileContent}>
                    <div>
						<button
                            className={styles.profileOption}
                            onClick={handleAccountInformation}
                        >
                            Account Information
                        </button>
                        <button
                            className={styles.profileOption}
                            onClick={handleTheme}
                        >
                            Theme
                        </button>
                        <button
                            className={styles.profileOption}
                            onClick={handleChangePassword}
                        >
                            Change Password
                        </button>
                        <button
							style={{backgroundColor: "#003971"}}
                            className={styles.profileOption}
                            onClick={handleDeleteAccount}
                        >
                            Delete Account
                        </button>
                    </div>
                    <div>
						<div>
							{ (loading) ?
								<div className={styles.invalidRequest}>
									Loading request...
								</div>
							:
								(error.status) ?
									<div className={styles.invalidRequest}>{error.message}</div>
								:
									<div></div>
							}
							<div className={styles.profileText}>
								If you no longer wish to use Flashier Cards, you can permanently delete your account.
							</div>
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

export default DeleteAccount;