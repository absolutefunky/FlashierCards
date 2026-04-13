import { Link } from "react-router-dom";
import styles from "../Styles/HomeForms.module.css";

function Login() {
    return (
        <div id={styles.content}>
            <div id={styles.title}>Flashier Cards</div>
            <form id={styles.signupForm}>
                <div>
                    <div className={styles.subtitle}>Username</div>
                    <input type="text" />
                </div>
                <div>
                    <div className={styles.subtitle}>Password</div>
                    <input type="password" />
                    <Link id={styles.forgotLink} to="/forgot-password">Forgot password?</Link>
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
            </form>
        </div>
    );
}

export default Login