import { useNavigate } from "react-router-dom";
import styles from "../Styles/Home.module.css";

function Home() {
    const navigate = useNavigate();

    function handleSignup() {
        navigate("/signup", {replace: true});
    }

    function handleLogin() {
        navigate("/login", {replace: true});
    }

    return (
        <div id={styles.homeContent}>
            <div id={styles.title}>Flashier Cards</div>
            <div id={styles.subtitle}>Study The Flashier Way</div>
            <button
                onClick={handleSignup}
                className={styles.homeBtn}
            >
                <span className={styles.signupShadow}></span>
                <span className={styles.signupEdge}></span>
                <span className={styles.signupFront}>Sign up</span>
            </button>
            <button
                onClick={handleLogin}
                className={styles.homeBtn}
            >
                <span className={styles.loginShadow}></span>
                <span className={styles.loginEdge}></span>
                <span className={styles.loginFront}>Log in</span>
            </button>
        </div>
    );
}

export default Home;