import { useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import styles from "../Styles/Profile.module.css";

function ChangePassword() {
    const [passwordOverlay, setPasswordOverlay] = useState(false);

    function showPasswordOverlay(request: boolean){
        setPasswordOverlay(request);
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
                        <Link style={{backgroundColor: "#003971"}} className={styles.profileOption} to="/profile/change-password">Change Password</Link>
                        <Link className={styles.profileOption} to="/profile/delete-account">Delete Account</Link>
                    </div>
                    <div>
                        <div>
                            <div className={styles.profileText}>Enter the information below to confirm password change!</div>
                            <form id={styles.signupForm}>
                                <div>
                                    <div className={styles.subtitle}>Current Password</div>
                                    <input type="password"/>
                                </div>
                                 <div>
                                    <div className={styles.subtitle}>New Password</div>
                                    <input type="password"/>
                                </div>
                                 <div>
                                    <div className={styles.subtitle}>Confirm New Password</div>
                                    <input type="password"/>
                                </div>
                                <button
                                    className={styles.homeBtn}
                                    onClick={() => showPasswordOverlay(true)}
                                >
                                    <span className={styles.loginShadow}></span>
                                    <span className={styles.loginEdge}></span>
                                    <span className={styles.loginFront}>Change Password</span>
                                </button>
                            </form>
                        </div>
                        <div style={{display: passwordOverlay ? "flex" : "none"}}  className={styles.overlay}>
                            <div className="signup-subtitle"> Are you completely sure you'd like to change your password?</div>
                            <button className="input-button" onClick={()=>showPasswordOverlay(false)}>
                                <span className="shadow-input"></span>
                                    <span className="edge-input"></span>
                                    <span className="front-input">
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                            </button>
                            <button className="input-button" onClick={()=>showPasswordOverlay(false)}>
                                <span className="shadow-input"></span>
                                <span className="edge-input"></span>
                                <span className="front-input">
                                    <FontAwesomeIcon icon={faX} />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword