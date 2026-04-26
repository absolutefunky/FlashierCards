import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useState, type ChangeEvent } from 'react';
import styles from "../Styles/Profile.module.css";

function ChangePassword() {
    const { userId } = useParams();
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    function showProfileOverlay(request: boolean) {
        if (request === true && (formData.currentPassword.length > 0 && formData.newPassword.length > 0 && formData.confirmNewPassword.length > 0)) {
            setError({status: false, message: ""});
            setShowOverlay(request);
        } else if (request == false) {
            setFormData({currentPassword: "", newPassword: "", confirmNewPassword: ""});
            setShowOverlay(request);
        } else {
            setError({status: true, message: "Please properly complete the form."});
        }
    }

    function handleFormData(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }

    const submitForm = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/changePassword`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                    confirmNewPassword: formData.confirmNewPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setLoading(false);
            setSuccess(true);
            showProfileOverlay(false);

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
                            style={{backgroundColor: "#003971"}}
                            className={styles.profileOption}
                            onClick={handleChangePassword}
                        >
                            Change Password
                        </button>
                        <button
                            className={styles.profileOption}
                            onClick={handleDeleteAccount}
                        >
                            Delete Account
                        </button>
                    </div>
                    <div>
                        { (loading) ?
                            <div className={styles.invalidRequest}>
                                Loading request...
                            </div>
                        :
                            (error.status) ?
                                <div className={styles.invalidRequest}>{error.message}</div>
                            :
                                (success) ?
                                    <div className={styles.invalidRequest}>
                                        Your password has been changed.
                                    </div>
                                :
                                    <div></div>
                        }
                        <div className={styles.profileText}>
                            Enter the information below to confirm password change.
                        </div>
                        <form id={styles.signupForm} onSubmit={submitForm}>
                            <div className={styles.formField}>
                                <div className={styles.subtitle}>Current password</div>
                                <input 
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleFormData}
                                    required={true}
                                />
                            </div>
                            <div className={styles.formField}>
                                <div className={styles.subtitle}>New password</div>
                                <input 
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleFormData}
                                    required={true}
                                />
                            </div>
                            <div className={styles.formField}>
                                <div className={styles.subtitle}>Confirm new password</div>
                                <input 
                                    type="password"
                                    name="confirmNewPassword"
                                    value={formData.confirmNewPassword}
                                    onChange={handleFormData}
                                    required={true}
                                />
                            </div>
                            <button
                                type="button"
                                className={styles.homeBtn}
                                style={{marginTop: "0.5rem"}}
                                onClick={() => showProfileOverlay(true)}
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

export default ChangePassword;