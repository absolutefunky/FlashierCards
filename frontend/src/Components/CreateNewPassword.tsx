import { useNavigate, useParams } from "react-router-dom";
import styles from "../Styles/HomeForms.module.css";
import { useState, type ChangeEvent } from "react";

function CreateNewPassword() {
    const navigate = useNavigate();
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
    const { userId } = useParams();

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmNewPassword: ""
    });

    function handleFormData(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }

    const submitForm = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            // create new password for user
            const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/createNewPassword`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    newPassword: formData.newPassword,
                    confirmNewPassword: formData.confirmNewPassword
                })
            });

            // get message and user data
            const userData = await userResponse.json();

            if (!userResponse.ok) {
                throw new Error(userData.message);
            }

            setLoading(false);
            navigate(`/dashboard/${userId}`, {replace: true});

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
                    <div className={styles.subtitle}>New password</div>
                    <input 
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleFormData}
                        required={true}
                    />
                </div>
                <div>
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
                    type="submit"
                    className={styles.homeBtn}
                    style={{marginTop: "0.5rem"}}
                >
                    <span className={styles.loginShadow}></span>
                    <span className={styles.loginEdge}></span>
                    <span className={styles.loginFront}>Create password</span>
                </button>
            </form>
        </div>
    );
}

export default CreateNewPassword;