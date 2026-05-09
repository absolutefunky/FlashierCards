import { motion } from "motion/react";
import styles from "../Styles/Home.module.css";

function HomeAnimation() {
    return (
        <div className={styles.animationContent}>
            <motion.div
                style={{minWidth: 130, minHeight: 130, borderRadius: 20, backgroundColor: "#afd6eb89" }}
                initial={{rotate: 45, x: 50}}
                animate={{rotate: 405, x: [50, window.innerWidth - 190]}}
                transition={{ duration: 3, ease: "easeInOut" }}
            />
            <motion.div
                style={{minWidth: 130, minHeight: 130, borderRadius: "50%", backgroundColor: "#004a94bc" }}
                initial={{scale: 0, x: 50}}
                animate={{scale: 1}}
                transition={{ duration: 3, ease: "easeInOut" }}
            />
            <motion.div
                style={{minWidth: 130, minHeight: 130, borderRadius: 20, backgroundColor: "#afd6eb89" }}
                initial={{rotate: 45, x: 50}}
                animate={{rotate: 405, x: [50, window.innerWidth - 190]}}
                transition={{ duration: 3, ease: "easeInOut" }}
            />
            <motion.div
                style={{minWidth: 130, minHeight: 130, borderRadius: "50%", backgroundColor: "#004a94bc" }}
                initial={{scale: 0, x: 50}}
                animate={{scale: 1}}
                transition={{ duration: 3, ease: "easeInOut" }}
            />
        </div>
    );
}

export default HomeAnimation;