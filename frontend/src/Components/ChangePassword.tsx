import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from 'react';
import styles from "../Styles/Profile.module.css";

function ChangePassword() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [inputs, setInputs] = useState({currentPassword: "", newPassword: "", confirmNewPassword: ""});
    const [isComplete, setComplete] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    function showProfileOverlay(request: boolean) {
        if (request === true && (inputs.currentPassword.length > 0 && inputs.newPassword.length > 0 && inputs.confirmNewPassword.length > 0)) {
            if (inputs.newPassword === inputs.confirmNewPassword) {
                setComplete(true);
                setPasswordMatch(true);
                setShowOverlay(request);
            } else {
                setComplete(true);
                setPasswordMatch(false);
            }
        } else if (request === false) {
            setShowOverlay(request);
            setInputs({currentPassword: "", newPassword: "", confirmNewPassword: ""});
        } else {
            setComplete(false);
        }
    }

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        showProfileOverlay(false);
        updateUserData();
    }

    const updateUserData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/1/changePassword`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({currentPassword: `${inputs.currentPassword}`, newPassword: `${inputs.newPassword}`})
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
                        <Link style={{backgroundColor: "#003971"}} className={styles.profileOption} to="/profile/change-password">Change Password</Link>
                        <Link className={styles.profileOption} to="/profile/delete-account">Delete Account</Link>
                    </div>
                    <div>
                        { (!isComplete) ? 
                            <div className={styles.invalidRequest}>
                                Please complete the form.
                            </div>
                        :
                            <div></div>
                        }
                        { (!passwordMatch) ? 
                            <div className={styles.invalidRequest}>
                                New password and Confirm new Password inputs do not match.
                            </div>
                        :
                            <div></div>
                        }
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
                                        Password has been changed.
                                    </div>
                                :
                                    <div></div>
                        }
                        <div className={styles.profileText}>
                            Enter the information below to confirm password change.
                        </div>
                        <form id={styles.signupForm} onSubmit={handleSubmit}>
                            <div className={styles.formField}>
                                <div className={styles.subtitle}>Current password</div>
                                <input 
                                    type="password"
                                    name="currentPassword"
                                    value={inputs.currentPassword}
                                    onChange={handleChange}
                                    required={true}
                                />
                            </div>
                            <div className={styles.formField}>
                                <div className={styles.subtitle}>New password</div>
                                <input 
                                    type="password"
                                    name="newPassword"
                                    value={inputs.newPassword}
                                    onChange={handleChange}
                                    required={true}
                                />
                            </div>
                            <div className={styles.formField}>
                                <div className={styles.subtitle}>Confirm new password</div>
                                <input 
                                    type="password"
                                    name="confirmNewPassword"
                                    value={inputs.confirmNewPassword}
                                    onChange={handleChange}
                                    required={true}
                                />
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
                            <div style={{display: showOverlay ? "flex" : "none"}}  className={styles.overlay}>
                                <div className={styles.subtitle} style={{fontWeight: "600"}}>Change My Password</div>
                                <div className={styles.profileText}>
                                    Are you sure you want to change your password?
                                </div>
                                <div style={{marginTop: "0.5rem"}}>
                                    <button
                                        className={styles.homeBtn}
                                        style={{marginRight: "1rem"}}
                                        type="submit"
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword