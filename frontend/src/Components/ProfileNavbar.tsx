import { useNavigate } from "react-router-dom";
import styles from "../Styles/Profile.module.css";

function ProfileNavbar({userId, profileType}: any) {
    const navigate = useNavigate();

    function handleAccountInformation() {
        navigate(`/profile/${userId}/accountInformation`, {replace: true});
    }

    function handleTheme() {
        navigate(`/profile/${userId}/theme`, {replace: true});
    }

    function handleChangePassword() {
        navigate(`/profile/${userId}/changePassword`, {replace: true});
    }

    function handleDeleteAccount() {
        navigate(`/profile/${userId}/deleteAccount`, {replace: true});
    }

    return (
        <div className={styles.profileNavbar}>
            <button
                style={{backgroundColor: (profileType === "account information") ? "#003971" : "#004A94"}}
                className={styles.profileOption}
                onClick={handleAccountInformation}
            >
                Account Information
            </button>
            <button
                style={{backgroundColor: (profileType === "theme") ? "#003971" : "#004A94"}}
                className={styles.profileOption}
                onClick={handleTheme}
            >
                Theme
            </button>
            <button
                style={{backgroundColor: (profileType === "change password") ? "#003971" : "#004A94"}}
                className={styles.profileOption}
                onClick={handleChangePassword}
            >
                Change Password
            </button>
            <button
                style={{backgroundColor: (profileType === "delete account") ? "#003971" : "#004A94"}}
                className={styles.profileOption}
                onClick={handleDeleteAccount}
            >
                Delete Account
            </button>
        </div>
    );
}

export default ProfileNavbar;