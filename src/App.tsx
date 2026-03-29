import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Study from "./Study";
import Edit from "./Edit"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/study" element={<Study />} />
                <Route path="/edit" element={<Edit />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;