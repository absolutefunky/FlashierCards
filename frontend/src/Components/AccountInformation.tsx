import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
import styles from "../Styles/Profile.module.css";
import { useEffect, useState } from 'react';
import type UserModel from "../Interfaces/User";

function AccountInformation() {
    const [user, setUser] = useState<UserModel>();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { userId } = useParams();

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/1`);
            if (!response.ok) {
                throw new Error("Invalid request.");
            }
            const data = await response.json();
            setIsLoading(false);
            setUser(data);
        } catch (error: any) {
            setIsLoading(false);
            setError(true);
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchUserData()
    }, []);

    return (
        <div id={styles.dashboardContent}>
            <Navbar userId={userId} />
            <div>
                <div id={styles.title}>Flashier Cards</div>
                <div id={styles.profileContent}>
                    <div>
                        <Link style={{backgroundColor: "#003971"}} className={styles.profileOption} to="/profile/account-information">Account Information</Link>
                        <Link className={styles.profileOption} to="/profile/theme">Theme</Link>
                        <Link className={styles.profileOption} to="/profile/change-password">Change Password</Link>
                        <Link className={styles.profileOption} to="/profile/delete-account">Delete Account</Link>
                    </div>
                    { (isLoading) ? 
                        <div>
                            <div className={styles.invalidRequest}>
                                Loading request...
                            </div>
                        </div>
                    :
                        (error) ?
                            <div>
                                <div className={styles.invalidRequest}>
                                    Invalid request.
                                </div>
                            </div>
                        :
                        <div>
                            <div className={styles.subtitle} style={{fontWeight: "600"}}>
                                Email
                            </div>
                            <div className={styles.profileText}>
                                {user?.email}
                            </div>
                            <div className={styles.subtitle} style={{fontWeight: "600"}}>
                                Date Account Created
                            </div>
                            <div className={styles.profileText}>
                                {user?.dateAccountCreated}
                            </div>
                            <div className={styles.subtitle} style={{fontWeight: "600"}}>
                                Total Number of Decks
                            </div>
                            <div className={styles.profileText}>
                                enter number here
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default AccountInformation;