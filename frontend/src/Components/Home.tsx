import { Link } from "react-router-dom";

function Home() {
    return (
        <div id="home-content">
            <div id="home-title">Flashier Cards</div>
            <div id="home-subtitle">Study The Flashier Way</div>
            <Link id="white-btn" to="/signup">Sign up</Link>
            <Link id="blue-btn" to="/login">Log in</Link>
        </div>
    );
}

export default Home