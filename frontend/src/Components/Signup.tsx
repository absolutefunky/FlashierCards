import { useNavigate } from "react-router-dom";
import styles from "../Styles/HomeForms.module.css";
import { UserAuth } from "../AuthContext";
import { useState } from "react";

function Signup() {
    const [inputs, setInputs] = useState({username: "", email: "", password: "", sqAnswer: ""});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {session, signUpUser}: any = UserAuth();
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    };

    const handleSignUp = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await signUpUser(inputs.email, inputs.password);
            if (!response.success) {
                throw new Error("Invalid request.");
            }
            setLoading(false);
            navigate("/dashboard");
        } catch (error: any) {
            setLoading(false);
            setError(true);
        }
    };

    return (
        <div id={styles.content}>
            {loading ?
                <div className={styles.invalidRequest}>
                    Loading request...
                </div>
            :
                (error) ?
                    <div className={styles.invalidRequest}>
                        Invalid request.
                    </div>
                :
                    <div></div>
            }
            <div id={styles.title}>Join Flashier Cards</div>
            <form id={styles.signupForm} onSubmit={handleSignUp}>
                <div>
                    <div className={styles.subtitle}>Username</div>
                    <input 
                        type="text"
                        name="username"
                        value={inputs.username}
                        onChange={handleChange}
                        required={true}
                    />
                </div>
                <div>
                    <div className={styles.subtitle}>Email</div>
                    <input 
                        type="email"
                        name="email"
                        value={inputs.email}
                        onChange={handleChange}
                        required={true}
                    />
                </div>
                <div>
                    <div className={styles.subtitle}>Password</div>
                    <input
                        type="password"
                        name="password"
                        value={inputs.password}
                        onChange={handleChange}
                        required={true}
                    />
                </div>
                <div>
                    <div className={styles.subtitle}>Name of your best friend</div>
                    <input
                        type="text"
                        name="sqAnswer"
                        value={inputs.sqAnswer}
                        onChange={handleChange}
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
                    <span className={styles.loginFront}>Create account</span>
                </button>
            </form>
        </div>
    );
}

export default Signup;