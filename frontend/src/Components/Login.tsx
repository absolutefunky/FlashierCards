import { Link } from "react-router-dom";
import styles from "../Styles/HomeForms.module.css";

function Login() {
    return (
        <div id={styles.content}>
            <div id={styles.title}>Flashier Cards</div>
            <form id={styles.signupForm}>
                <div>
                    <div className={styles.subtitle}>Email</div>
                    <input type="email" />
                </div>
                <div>
                    <div className={styles.subtitle}>Password</div>
                    <input type="password" />
                </div>
                <Link
                    to="/dashboard"
                    className={styles.homeBtn}
                    style={{marginTop: "0.5rem"}}
                >
                    <span className={styles.loginShadow}></span>
                    <span className={styles.loginEdge}></span>
                    <span className={styles.loginFront}>Log in</span>
                </Link>
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

export default Login