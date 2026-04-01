import {useState} from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Profile() {
    return (
        <div id="dashboard-content">
            <div id="navbar">
                <Link className="nav-option" to="/dashboard">
                    <span><FontAwesomeIcon icon={faBars} className="menu-icon" /></span>
                    <span>Menu</span>
                </Link>
                <Link className="nav-option" to="/dashboard">
                    <span><FontAwesomeIcon icon={faFolder} className="menu-icon" /></span>
                    <span>Decks</span>
                </Link>
                <Link style={{backgroundColor: "#004A94", border: "2px solid #004A94", color: "white"}} className="nav-option" to="/profile">
                    <span><FontAwesomeIcon icon={faCircleUser} className="menu-icon" /></span>
                    <span>Profile</span>
                </Link>
                <Link className="nav-option" to="/">
                    <span><FontAwesomeIcon icon={faRightFromBracket} className="menu-icon" /></span>
                    <span>Log out</span>
                </Link>
            </div>
            <div>
                profile content
            </div>
        </div>
    );
}

/*
const Profile = () => {
    const [info, setInfo] = useState("");
    return (
        <div>profile view</div>
        /*
       <div className='menu'>
            <h1>Flashier Cards</h1>
            {info && <p className="info">{info}</p>}
            <nav className='profile-options'>
                <button onClick={()=>setInfo("showing all account information")}>Account Information</button>
                <button onClick={()=>setInfo("showing all change theme information")}>Change Theme</button>
                <button onClick={()=>setInfo("showing all change password information")}>Change Password</button>
                <button onClick={()=>setInfo("showing all delete account information")}>Delete Account</button>
            </nav>
       </div>
    );
};*/


export default Profile