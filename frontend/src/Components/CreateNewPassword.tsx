import { Link } from "react-router-dom";
import styles from "../Styles/HomeForms.module.css";

function CreateNewPassword() {
    return (
        <div id={styles.content}>
            <div id={styles.title}>Flashier Cards</div>
            <form id={styles.signupForm}>
                <div>
                    <div className={styles.subtitle}>New Password</div>
                    <input type="password" />
                </div>
                <div>
                    <div className={styles.subtitle}>Confirm New Password</div>
                    <input type="password" />
                </div>
                <Link
                    to="/dashboard"
                    className={styles.homeBtn}
                    style={{marginTop: "0.5rem"}}
                >
                    <span className={styles.loginShadow}></span>
                    <span className={styles.loginEdge}></span>
                    <span className={styles.loginFront}>Create password</span>
                </Link>
            </form>
        </div>
    );
}

export default CreateNewPassword