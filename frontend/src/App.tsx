import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Study from "./Components/Study";
import Edit from "./Components/Edit";
import Profile from "./Components/Profile";
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
                <Route path="/signup" element={<Signup/>} />
                <Route path="/verify" element={<Verify/>} /> 
                    <Route path="/create-new-password" element={<CreateNewPassword/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/study" element={<Study />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/profile" element={<Profile />}>
                    {profile ? <Route path="account-information" element={<AccountInformation id={profile.id} userId={profile.userId} backgroundColor={profile.backgroundColor} animationType={profile.animationType} />} /> : 
                    <Route path="account-information" element={<AccountInformation id={0} userId={0} backgroundColor="none" animationType="none" /> } /> }
                    <Route path="theme" element={<Theme />} />
                    <Route path="change-password" element={<ChangePassword />} />
                    <Route path="delete-account" element={<DeleteAccount />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App