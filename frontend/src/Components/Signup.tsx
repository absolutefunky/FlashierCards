import { useNavigate } from "react-router-dom";
import styles from "../Styles/HomeForms.module.css";
import { useState, type ChangeEvent } from "react";
import UserAuth from "../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
    const { register } = UserAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        sqAnswer: ""
    });

    function navigateToHome() {
        navigate("/", {replace: true});
    }

    function handleFormData(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }

    const submitForm = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            // create user account
            const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email.trim().toLowerCase(),
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    sqAnswer: formData.sqAnswer.trim()
                })
            });

            // get message and user data
            const userData = await userResponse.json();

            if (!userResponse.ok) {
                throw new Error(userData.message);
            }
            
            // create user profile
            const profileResponse = await fetch(`${import.meta.env.VITE_API_URL}/user/${userData.user.id}/createProfile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userData.token}`
                },
                body: JSON.stringify({
                    userId: userData.user.id,
                    backgroundColor: "none",
                    animationType: "animationOne"
                })
            });

            // get message and profile data
            const profileData = await profileResponse.json();

            if (!profileResponse.ok) {
                throw new Error(profileData.message);
            }

            setLoading(false);

            // go to dashboard after user account and profile is created
            register(userData.token).then(() => {
                navigate(`/dashboard/${userData.user.id}`, {replace: true});
            })

        } catch(error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.homeNav}>
                <span className={styles.homeNavBtn} onClick={navigateToHome}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </span>
            </div>
            <div className={styles.content}>
                <div className={styles.title}>Join Flashier Cards</div>
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
                        <div className={styles.subtitle}>Password</div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleFormData}
                        />
                    </div>
                    <div>
                        <div className={styles.subtitle}>Confirm password</div>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
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
                        <span className={styles.loginFront}>Create account</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;