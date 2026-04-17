import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from 'react';
import styles from "../Styles/Profile.module.css";

function ChangePassword() {
    const [showOverlay, setShowOverlay] = useState(false);

    function showProfileOverlay(request: boolean) {
        setShowOverlay(request);
    }

    return (
        <div id={styles.dashboardContent} style={{pointerEvents: showOverlay ? "none" : "auto"}}>
            <Navbar />
            <div>
                <div id={styles.title}>Flashier Cards</div>
                <div id={styles.profileContent}>
                    <div>
                        <Link className={styles.profileOption} to="/profile/account-information">Account Information</Link>
                        <Link className={styles.profileOption} to="/profile/theme">Theme</Link>
                        <Link style={{backgroundColor: "#003971"}} className={styles.profileOption} to="/profile/change-password">Change Password</Link>
                        <Link className={styles.profileOption} to="/profile/delete-account">Delete Account</Link>
                    </div>
                    <div>
                        <div>
                            <div className={styles.profileText}>
                                Enter the information below to confirm password change.
                            </div>
                            <form id={styles.signupForm}>
                                <div className={styles.formField}>
                                    <div className={styles.subtitle}>Current password</div>
                                    <input type="password" />
                                </div>
                                <div className={styles.formField}>
                                    <div className={styles.subtitle}>New password</div>
                                    <input type="password" />
                                </div>
                                <div className={styles.formField}>
                                    <div className={styles.subtitle}>Confirm new password</div>
                                    <input type="password" />
                                </div>
                                <button
                                    type="button"
                                    className={styles.homeBtn}
                                    onClick={() => showProfileOverlay(true)}
                                    style={{marginTop: "0.5rem"}}
                                >
                                    <span className={styles.loginShadow}></span>
                                    <span className={styles.loginEdge}></span>
                                    <span className={styles.loginFront}>Change password</span>
                                </button>
                            </form>
                        </div>
                        <div style={{display: showOverlay ? "flex" : "none"}}  className={styles.overlay}>
                            <div className={styles.subtitle} style={{fontWeight: "600"}}>Change My Password</div>
                            <div className={styles.profileText}>
								Are you sure you want to change your password?
							</div>
                            <div style={{marginTop: "0.5rem"}}>
                                <button
                                    className={styles.homeBtn}
                                    style={{marginRight: "1rem"}}
                                    type="button"
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

export default ChangePassword