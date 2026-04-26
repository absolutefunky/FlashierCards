import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../Styles/Profile.module.css";
import type Profile from "../Interfaces/Profile";
import { useEffect, useState } from 'react';

function Theme() {
    const { userId } = useParams();
    const [profile, setProfile] = useState<Profile>();
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchProfileData = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/profiles`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setProfile(data);
            setLoading(false);
            
        } catch (error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
        }
    };
    
    useEffect(() => {
        fetchProfileData()
    }, []);

    const updateProfileData = async (request: string) => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/profiles/${profile?.id}/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({animationType: `${request}`})
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setProfile({...profile!, animationType: data.animationType})
            setLoading(false);

        } catch (error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
        }
    };

    function handleAccountInformation() {
        navigate(`/profile/${userId}/accountInformation`);
    }

    function handleTheme() {
        navigate(`/profile/${userId}/theme`);
    }

    function handleChangePassword() {
        navigate(`/profile/${userId}/changePassword`);
    }

    function handleDeleteAccount() {
        navigate(`/profile/${userId}/deleteAccount`);
    }

    return (
        <div id={styles.dashboardContent}>
            <Navbar userId={userId} />
            <div>
                <div id={styles.title}>Flashier Cards</div>
                <div id={styles.profileContent}>
                    <div>
                        <button
                            className={styles.profileOption}
                            onClick={handleAccountInformation}
                        >
                            Account Information
                        </button>
                        <button
                            style={{backgroundColor: "#003971"}}
                            className={styles.profileOption}
                            onClick={handleTheme}
                        >
                            Theme
                        </button>
                        <button
                            className={styles.profileOption}
                            onClick={handleChangePassword}
                        >
                            Change Password
                        </button>
                        <button
                            className={styles.profileOption}
                            onClick={handleDeleteAccount}
                        >
                            Delete Account
                        </button>
                    </div>
                    <div>
                        <div>
                            { (loading) ?
                                <div className={styles.invalidRequest}>
                                    Loading request...
                                </div>
                            :
                                (error.status) ?
                                    <div className={styles.invalidRequest}>{error.message}</div>
                                :
                                    <div></div>
                            }
                            <div className={styles.subtitle} style={{fontWeight: "600"}}>Background Animations</div>
                            <div id={styles.profileThemes}>
                                <div 
                                    style={{border: (profile?.animationType === "none" ? "2px solid #004A94" : "2px solid #D9EDF8")}} 
                                    onClick={() => updateProfileData("none")}
                                >
                                    No Animation
                                </div>
                                <div 
                                    style={{border: (profile?.animationType === "animationOne" ? "2px solid #004A94" : "2px solid #D9EDF8")}} 
                                    onClick={() => updateProfileData("animationOne")}
                                >
                                    Animation One
                                </div>
                                <div 
                                    style={{border: (profile?.animationType === "animationTwo" ? "2px solid #004A94" : "2px solid #D9EDF8")}} 
                                    onClick={() => updateProfileData("animationTwo")}
                                >
                                    Animation Two
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Theme;