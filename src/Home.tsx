import { Link } from "react-router-dom";
import "./home.css";

// landing page of application
function Home() {
    return (
        <div id="home-main">
            <div id="home-title">Flashier Cards</div>
            <div id="home-sub-title">Study The Flashier Way</div>
            <Link id="home-sign-up-btn" to="/signup">Sign up</Link>
            <Link id="home-log-in-btn" to="/login">Log in</Link>
        </div>
    );
}

export default Home;