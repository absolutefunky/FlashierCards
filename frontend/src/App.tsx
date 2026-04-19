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
import Canvas from "./Components/Canvas";
import { AuthContextProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";

function App() {
   
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Routes>
                    {/* public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />

                    {/* private routes */}
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />




                    {/* signup routes */}
                    <Route path="/canvas" element={<Canvas />} />
                    
                    <Route path="/signup/verify" element={<Verify location="/dashboard" />} /> 
                    
                    {/* login routes */}
                    
                    <Route path="/login/forgot-password" element={<ForgotPassword />} />
                    <Route path="/login/forgot-password/verify" element={<Verify location="/login/forgot-password/create-new-password" />} /> 
                    <Route path="/login/forgot-password/create-new-password" element={<CreateNewPassword />} />
                    
                    
                    <Route path="/study" element={<Study />} />
                    <Route path="/edit" element={<Edit />} />

                    {/* profile routes */}
                    <Route path="/profile/account-information" element={<AccountInformation />} />
                    <Route path="/profile/theme" element={<Theme />} />
                    <Route path="/profile/change-password" element={<ChangePassword />} />
                    <Route path="/profile/delete-account" element={<DeleteAccount />} />
                </Routes>
            </BrowserRouter>
        </AuthContextProvider>
    );
}

export default App;