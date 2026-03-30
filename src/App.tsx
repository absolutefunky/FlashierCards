import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup.tsx"
import Login from "./Login.tsx";
import Dashboard from './Dashboard.tsx';
import Study from "./Study.tsx";
import Edit from "./Edit.tsx"
import Profile from './Profile.tsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/study" element={<Study />} />
                <Route path="/edit" element={<Edit />} />                
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;