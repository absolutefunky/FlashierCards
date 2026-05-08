import { useNavigate } from "react-router-dom";
import styles from "../Styles/HomeForms.module.css";
import { useState, type ChangeEvent } from "react";
import UserAuth from "../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ForgotPassword() {
    const navigate = useNavigate();
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
     const { register }: any = UserAuth();

    const [formData, setFormData] = useState({
        email: "",
        sqAnswer: ""
    });

    function navigateToLogin() {
        navigate("/login", {replace: true});
    }

    function handleFormData(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }

    const submitForm = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            // find user account
            const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/user/forgotPassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email.trim().toLowerCase(),
                    sqAnswer: formData.sqAnswer
                })
            });

            // get message and user data
            const userData = await userResponse.json();

            if (!userResponse.ok) {
                throw new Error(userData.message);
            }

            setLoading(false);

            // go to create new password after user is authenticated
            register(userData.token).then(() => {
                navigate(`/forgotPassword/${userData.user.id}/createNewPassword`, {replace: true})
            })

        } catch(error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.homeNav}>
                <span className={styles.homeNavBtn} onClick={navigateToLogin}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </span>
            </div>
            <div className={styles.content}>
                <div className={styles.title}>Flashier Cards</div>
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
                <form className={styles.signupForm} onSubmit={submitForm}>
                    <div>
                        <div className={styles.subtitle}>Email</div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormData}
                        />
                    </div>
                    <div>
                        <div className={styles.subtitle}>Name of your best friend</div>
                        <input
                            type="text"
                            name="sqAnswer"
                            value={formData.sqAnswer}
                            onChange={handleFormData}
                        />
                    </div>
                    <button
                        type="submit"
                        className={styles.homeBtn}
                        style={{marginTop: "0.5rem"}}
                    >
                        <span className={styles.loginShadow}></span>
                        <span className={styles.loginEdge}></span>
                        <span className={styles.loginFront}>Continue</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;