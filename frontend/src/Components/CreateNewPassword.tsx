import { useNavigate, useParams } from "react-router-dom";
import styles from "../Styles/HomeForms.module.css";
import { useState, type ChangeEvent } from "react";
import UserAuth from "../AuthContext";
import Tooltip from "@mui/material/Tooltip";

function CreateNewPassword() {
    const navigate = useNavigate();
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
    const { userId } = useParams();
    const { token }: any = UserAuth();

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
            const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/createNewPassword`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
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
        <div className={styles.main}>
            <div className={styles.content} style={{marginTop: "4.5rem"}}>
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
                    <Tooltip title="Password should have 8 characters with at least one uppercase letter, lowercase letter, number, and special character.">
                        <div>
                            <div className={styles.subtitle}>New password</div>
                            <input 
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleFormData}
                            />
                        </div>
                    </Tooltip>
                    <div>
                        <div className={styles.subtitle}>Confirm new password</div>
                        <input 
                            type="password"
                            name="confirmNewPassword"
                            value={formData.confirmNewPassword}
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
                        <span className={styles.loginFront}>Create password</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateNewPassword;