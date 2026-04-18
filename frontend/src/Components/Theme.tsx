import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import styles from "../Styles/Profile.module.css";
import { useState } from 'react';

function Theme() {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const updateProfileData = async (request: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/1/profiles/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({animationType: `${request}`})
            });
            if (!response.ok) {
                throw new Error("Invalid request.");
            }
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            setError(true);
            console.log(error.message);
        }
    };

    return (
        <div id={styles.dashboardContent}>
            <Navbar />
            <div>
                <div id={styles.title}>Flashier Cards</div>
                <div id={styles.profileContent}>
                    <div>
                        <Link className={styles.profileOption} to="/profile/account-information">Account Information</Link>
                        <Link style={{backgroundColor: "#003971"}} className={styles.profileOption} to="/profile/theme">Theme</Link>
                        <Link className={styles.profileOption} to="/profile/change-password">Change Password</Link>
                        <Link className={styles.profileOption} to="/profile/delete-account">Delete Account</Link>
                    </div>
                    <div>
                        <div>
                            { (isLoading) ?
                                <div className={styles.invalidRequest}>
                                    Loading request...
                                </div>
                            :
                                (error) ?
                                    <div className={styles.invalidRequest}>
                                        Invalid request.
                                    </div>
                                :
                                <div></div>
                            }
                            <div className={styles.subtitle} style={{fontWeight: "600"}}>Background Animations</div>
                            <div id={styles.profileThemes}>
                                <div onClick={() => updateProfileData("animationOne")}>add animation 1 here</div>
                                <div onClick={() => updateProfileData("animationTwo")}>add animation 2 here</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Theme