import { Link, useNavigate } from "react-router-dom";
import styles from "../Styles/HomeForms.module.css";
import { UserAuth } from "../AuthContext";
import { useState } from "react";

function Login() {
    const [inputs, setInputs] = useState({email: "", password: ""});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {session, logInUser}: any = UserAuth();
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    };

    const handleLogIn = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await logInUser(inputs.email, inputs.password);
            if (!response.success) {
                throw new Error("Invalid login request.");
            }
            setLoading(false);
            navigate("/dashboard");
        } catch (error: any) {
            setLoading(false);
            setError(true);
            console.log(error.message);
        }
    };

    return (
        <div id={styles.content}>
            <div id={styles.title}>Flashier Cards</div>
            <form id={styles.signupForm} onSubmit={handleLogIn}>
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
                <button
                    type="submit"
                    className={styles.homeBtn}
                    style={{marginTop: "0.5rem"}}
                >
                    <span className={styles.loginShadow}></span>
                    <span className={styles.loginEdge}></span>
                    <span className={styles.loginFront}>Log in</span>
                </button>
                <Link
                    to="/login/forgot-password"
                    className={styles.homeBtn}
                >
                    <span className={styles.signupShadow}></span>
                    <span className={styles.signupEdge}></span>
                    <span className={styles.signupFront}>Forgot password?</span>
                </Link>
            </form>
        </div>
    );
}

export default Login;