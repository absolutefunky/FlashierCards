import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import styles from "../Styles/Profile.module.css";
import { useEffect, useState } from 'react';
import type UserModel from "../Interfaces/User";
import UserAuth from "../AuthContext";
import ProfileNavbar from "./ProfileNavBar";

function AccountInformation() {
    const { userId } = useParams();
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<UserModel>();
    const [totalDecks, setTotalDecks] = useState();
    const { token }: any = UserAuth();

    const fetchUserData = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // get message and user data
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setUser(data);

            // get list of decks to count
            const deckResponse = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/decks`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // get message and deck data
            const deckData = await deckResponse.json();

            if (!deckResponse.ok) {
                throw new Error(deckData.message);
            }

            setTotalDecks(deckData.length);
            setLoading(false);
            
        } catch (error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
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
                    <ProfileNavbar userId={userId} profileType={"account information"} />
                    <div>
                        { (loading) ? 
                            <div className={styles.invalidRequest}>
                                Loading request...
                            </div>
                        :
                            (error.status) ?
                                <div className={styles.invalidRequest}>
                                    {error.message}
                                </div>
                            :
                                <div></div>
                        }
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
                            {totalDecks}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountInformation;