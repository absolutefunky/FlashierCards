import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import styles from "../Styles/Profile.module.css";
import type Profile from "../Interfaces/Profile";
import { useEffect, useState } from 'react';
import UserAuth from "../AuthContext";
import ProfileNavbar from "./ProfileNavbar";

function Theme() {
    const { userId } = useParams();
    const [profile, setProfile] = useState<Profile>();
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
    const { token } = UserAuth();

    const fetchProfileData = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/profile`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/profile/${profile?.id}/updateProfile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
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

    return (
        <div className={styles.dashboardContent}>
            <Navbar userId={userId} />
            <div>
                <div className={styles.title}>Flashier Cards</div>
                <div className={styles.profileContent}>
                    <ProfileNavbar userId={userId} profileType={"theme"} />
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
                        <div className={styles.subtitle} style={{fontWeight: "600"}}>
                            Background Animations
                        </div>
                        <div className={styles.profileText}>
                            Select background animation for the study web page.
                        </div>
                        <div className={styles.profileThemes}>
                            <div
                                style={{border: (profile?.animationType === "none" ? "2px solid #004A94" : "2px solid #D9EDF8")}} 
                                onClick={() => updateProfileData("none")}
                            >
                                <span className={styles.profileText}>No Animation</span>
                            </div>
                            <div 
                                style={{border: (profile?.animationType === "animationOne" ? "2px solid #004A94" : "2px solid #D9EDF8")}} 
                                onClick={() => updateProfileData("animationOne")}
                            >
                                
                                <span className={styles.profileText}>Circles Animation</span>
                            </div>
                            <div 
                                style={{border: (profile?.animationType === "animationTwo" ? "2px solid #004A94" : "2px solid #D9EDF8")}} 
                                onClick={() => updateProfileData("animationTwo")}
                            >
                                <span className={styles.profileText}>Stripes Animation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Theme;