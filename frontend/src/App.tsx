import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Study from "./Components/Study";
import Edit from "./Components/Edit";
import AccountInformation from "./Components/AccountInformation";
import Theme from "./Components/Theme";
import ChangePassword from "./Components/ChangePassword";
import DeleteAccount from "./Components/DeleteAccount";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Verify from "./Components/Verify";
import ForgotPassword from "./Components/ForgotPassword";
import CreateNewPassword from "./Components/CreateNewPassword";
import { useEffect, useState } from 'react';
import type UserModel from "./Interfaces/User";
import type ProfileModel from "./Interfaces/Profile";
import type DeckModel from "./Interfaces/Deck";

function App() {
    const [user, setUser] = useState<UserModel>();
    const [profile, setProfile] = useState<ProfileModel>();
    const [decks, setDecks] = useState<DeckModel[]>();
  
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/users/11`)
            .then(response => response.json().then(json => setUser(json)))
    }, []);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/users/11/profiles`)
            .then(response => response.json().then(json => setProfile(json)))
    }, []);


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                {/* signup routes */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup/verify" element={<Verify location="/dashboard" />} /> 
                
                {/* login routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/login/forgot-password" element={<ForgotPassword />} />
                <Route path="/login/forgot-password/verify" element={<Verify location="/login/forgot-password/create-new-password" />} /> 
                <Route path="/login/forgot-password/create-new-password" element={<CreateNewPassword />} />
                
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/study" element={<Study />} />
                <Route path="/edit" element={<Edit />} />

                {/* profile routes */}
                <Route path="/profile/account-information" element={<AccountInformation />} />
                <Route path="/profile/theme" element={<Theme />} />
                <Route path="/profile/change-password" element={<ChangePassword />} />
                <Route path="/profile/delete-account" element={<DeleteAccount />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App