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
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ForgotPassword from "./Components/ForgotPassword";
import CreateNewPassword from "./Components/CreateNewPassword";
import PrivateRoute from "./PrivateRoute";

function App() {   
    return (
        <BrowserRouter>
            <Routes>
                {/* public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />

                {/* testing route 
                <Route path="/canvas" element={<Canvas />} />*/}

                {/* private routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard/:userId" element={<Dashboard />} />
                    <Route path="/forgotPassword/:userId/createNewPassword" element={<CreateNewPassword />} />
                    <Route path="/user/:userId/study/:deckId" element={<Study />} />
                    <Route path="/user/:userId/edit/:deckId" element={<Edit />} />
                    <Route path="/profile/:userId/accountInformation" element={<AccountInformation />} />
                    <Route path="/profile/:userId/theme" element={<Theme />} />
                    <Route path="/profile/:userId/changePassword" element={<ChangePassword />} />
                    <Route path="/profile/:userId/deleteAccount" element={<DeleteAccount />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;