import {useState} from 'react';
import "./Profile.css";

const Profile = () => {
    const [info, setInfo] = useState("");
    return (
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
};
export default Profile;