import { Link } from "react-router-dom";
import styles from "../Styles/HomeForms.module.css";
import { useState } from "react";

function Signup() {
    const [inputs, setInputs] = useState({username: "", email: "", password: "", confirmPassword: "", sqAnswer: ""});

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    };

    return (
        <div id={styles.content}>
            <div id={styles.title}>Join Flashier Cards</div>
            <form id={styles.signupForm}>
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
                    <div className={styles.subtitle}>Confirm password</div>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={inputs.confirmPassword}
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
                <Link
                    to="/dashboard"
                    className={styles.homeBtn}
                    style={{marginTop: "0.5rem"}}
                >
                    <span className={styles.loginShadow}></span>
                    <span className={styles.loginEdge}></span>
                    <span className={styles.loginFront}>Create account</span>
                </Link>
            </form>
        </div>
    );
}

export default Signup;