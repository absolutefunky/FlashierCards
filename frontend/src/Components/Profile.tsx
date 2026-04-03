import Navbar from "./Navbar";
import { Link, Outlet } from "react-router-dom";

function Profile() {
    return (
        <div id="dashboard-content">
            <Navbar />
            <div>
                <div id="signup-title">Flashier Cards</div>
                <div className="profile">
                    <div>
                        <Link className="profile-option" to="/profile/account-information">Account Information</Link>
                        <Link className="profile-option" to="/profile/theme">Theme</Link>
                        <Link className="profile-option" to="/profile/change-password">Change Password</Link>
                        <Link className="profile-option" to="/profile/delete-account">Delete Account</Link>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Profile