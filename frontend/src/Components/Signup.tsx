import { Link } from "react-router-dom";
import styles from "../Styles/HomeForms.module.css";

function Signup() {
    return (
        <div id={styles.content}>
            <div id={styles.title}>Join Flashier Cards</div>
            <form id={styles.signupForm}>
                <div className={styles.subtitle}>
                    <div>Email</div>
                    <input type="email" />
                </div>
                <div className={styles.subtitle}>
                    <div>Password</div>
                    <input type="password" />
                </div>
                <div className={styles.subtitle}>
                    <div>Confirm Password</div>
                    <input type="password" />
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

export default Signup