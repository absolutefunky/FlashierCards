import { Link } from "react-router-dom";
import styles from "../Styles/HomeForms.module.css";

function Verify(prop : any) {
    return (
        <div id={styles.content}>
            <div id={styles.title}>Flashier Cards</div>
            <form id={styles.signupForm}>
                <div>
                    <div className={styles.subtitle}>Enter verification code from email</div>
                    <input type="text" />
                </div>
                <Link
                    to={prop.location}
                    className={styles.homeBtn}
                    style={{marginTop: "0.5rem"}}
                >
                    <span className={styles.loginShadow}></span>
                    <span className={styles.loginEdge}></span>
                    <span className={styles.loginFront}>Verify</span>
                </Link>
            </form>
        </div>
    );
}

export default Verify