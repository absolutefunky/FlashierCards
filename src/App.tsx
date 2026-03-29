import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Study from "./Study";
import Edit from "./Edit"
import Dashboard from './Dashboard.tsx';
import Profile from './Profile.tsx';
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/study" element={<Study />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/" element={<Dashboard/>} />
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;