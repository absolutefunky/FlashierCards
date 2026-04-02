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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/study" element={<Study />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/profile" element={<Profile />}>
                    <Route path="account-information" element={<AccountInformation />} />
                    <Route path="theme" element={<Theme />} />
                    <Route path="change-password" element={<ChangePassword />} />
                    <Route path="delete-account" element={<DeleteAccount />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App