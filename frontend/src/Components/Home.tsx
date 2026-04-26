import { Link } from "react-router-dom";
import styles from "../Styles/Home.module.css";

function Home() {
    return (
        <div id={styles.homeContent}>
            <div id={styles.title}>Flashier Cards</div>
            <div id={styles.subtitle}>Study The Flashier Way</div>
            <Link
                to="/signup"
                className={styles.homeBtn}
            >
                <span className={styles.signupShadow}></span>
                <span className={styles.signupEdge}></span>
                <span className={styles.signupFront}>Sign up</span>
            </Link>
            <Link
                to="/login"
                className={styles.homeBtn}
            >
                <span className={styles.loginShadow}></span>
                <span className={styles.loginEdge}></span>
                <span className={styles.loginFront}>Log in</span>
            </Link>
        </div>
    );
}

export default Home;