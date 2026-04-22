import { useNavigate } from "react-router-dom";
import styles from "../Styles/HomeForms.module.css";
import { useState, type ChangeEvent } from "react";

function ForgotPassword() {
    const navigate = useNavigate();
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        sqAnswer: ""
    });

    function handleFormData(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }

    const submitForm = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            // find user account
            const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/forgotPassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email.trim(),
                    sqAnswer: formData.sqAnswer
                })
            });

            // get message and user data
            const userData = await userResponse.json();

            if (!userResponse.ok) {
                throw new Error(userData.message);
            }

            setLoading(false);
            navigate(`/forgotPassword/${userData.user.id}/createNewPassword`, {replace: true});

        } catch(error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
        }
    }

    return (
        <div id={styles.content}>
            <div id={styles.title}>Flashier Cards</div>
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
            <form id={styles.signupForm} onSubmit={submitForm}>
                <div>
                    <div className={styles.subtitle}>Email</div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormData}
                        required={true}
                    />
                </div>
                <div>
                    <div className={styles.subtitle}>Name of your best friend</div>
                    <input
                        type="text"
                        name="sqAnswer"
                        value={formData.sqAnswer}
                        onChange={handleFormData}
                        required={true}
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
    );
}

export default ForgotPassword;