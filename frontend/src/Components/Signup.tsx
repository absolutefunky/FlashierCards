import { Link } from "react-router-dom";
import styles from "../Styles/HomeForms.module.css";

function Signup() {
    return (
        <div id={styles.content}>
            <div id={styles.title}>Join Flashier Cards</div>
            <form id={styles.signupForm}>
                <div>
                    <div className={styles.subtitle}>Email</div>
                    <input type="email" />
                </div>
                <div>
                    <div className={styles.subtitle}>Password</div>
                    <input type="password" />
                </div>
                <div>
                    <div className={styles.subtitle}>Confirm password</div>
                    <input type="password" />
                </div>
                <div>
                    <div className={styles.subtitle}>Name of your best friend</div>
                    <input type="text" />
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