import { Link } from "react-router-dom";

// landing page of application
function Home() {
    return (
        <div className="home-main">
            <div className="home-title">Flashier Cards</div>
            <div className="home-sub-title">Study The Flashier Way</div>
            <Link className="sign-up-btn" to="/study">Sign up</Link>
            <Link className="log-in-btn" to="/edit">Log in</Link>
        </div>
    );
}

export default Home;