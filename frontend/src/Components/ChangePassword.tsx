import { useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import styles from "../Styles/Profile.module.css";

function ChangePassword() {
const [passwordOverlay, setPasswordOverlay] = useState(false);
function showPasswordOverlay(request:boolean){
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
                        <Link style={{backgroundColor: "#B3DEF4", fontWeight: "600"}} className={styles.profileOption} to="/profile/change-password">Change Password</Link>
                        <Link className={styles.profileOption} to="/profile/delete-account">Delete Account</Link>
                    </div>
                    <div>
                        <span>Enter the information below to confirm password change!</span>
                        <div className="signup-subtitle">Current Password</div>
                        <input className= "password-confirm" type="password"/>
                        <div className="signup-subtitle">New Password</div>
                        <input className="password-confirm" type="password" />
                        <div className="signup-subtitle">New Password</div>
                        <input className="password-confirm" type="password" />
                        <button className="input-button" onClick={()=> showPasswordOverlay(true)}>
                            <span className="shadow-input"></span>
                            <span className="edge-input"></span>
                            <span className="front-input">CREATE</span>
                        </button>
                        {
                            passwordOverlay && (
                                <div className="password-overlay">
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
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword