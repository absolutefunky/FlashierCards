import {Link} from "react-router-dom";
import styles from "../Styles/HomeForms.module.css";

function ForgotPassword() {
    return (
        <div id={styles.content}>
            <div id={styles.title}>Flashier Cards</div>
            <form id={styles.signupForm}>
                <div>
                    <div className={styles.subtitle}>Email</div>
                    <input type="email" />
                </div>
                <div>
                    <div className={styles.subtitle}>Name of your best friend</div>
                    <input type="text" />
                </div>
                <Link
                    to="/login/forgot-password/create-new-password"
                    className={styles.homeBtn}
                    style={{marginTop: "0.5rem"}}
                >
                    <span className={styles.loginShadow}></span>
                    <span className={styles.loginEdge}></span>
                    <span className={styles.loginFront}>Continue</span>
                </Link>
            </form>
        </div>
    );
}

export default ForgotPassword