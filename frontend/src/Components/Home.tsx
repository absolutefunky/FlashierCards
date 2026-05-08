import { useNavigate } from "react-router-dom";
import styles from "../Styles/Home.module.css";
import { motion } from "motion/react";

function Home() {
    const navigate = useNavigate();

    function handleSignup() {
        navigate("/signup", {replace: true});
    }

    function handleLogin() {
        navigate("/login", {replace: true});
    }

    return (
        <div className={styles.main}>
            <div className={styles.animations}>
                <motion.div
                    style={{minWidth: 130, minHeight: 130, borderRadius: 20, backgroundColor: "#afd6eb89" }}
                    initial={{rotate: 45}}
                    animate={{ rotate: 405 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.div
                    style={{minWidth: 130, minHeight: 130, borderRadius: "50%", backgroundColor: "#004a94bc" }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.div
                    style={{minWidth: 130, minHeight: 130, borderRadius: 20, backgroundColor: "#afd6eb89" }}
                    initial={{rotate: 45}}
                    animate={{ rotate: 405 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.div
                    style={{minWidth: 130, minHeight: 130, borderRadius: "50%", backgroundColor: "#004a94bc" }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
            </div>
            <div className={styles.homeContent}>
                <div className={styles.title}>Flashier Cards</div>
                <div className={styles.subtitle}>Study The Flashier Way</div>
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
        </div>
    );
}

export default Home;