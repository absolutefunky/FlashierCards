import { Link } from "react-router-dom";

function Login() {
    return (
        <div id="signup-content">
            <div id="signup-title">Flashier Cards</div>
            <form id="signup-form" action="">
                <div>
                    <div className="signup-subtitle">Username</div>
                    <input type="text" />
                </div>
                <div>
                    <div className="signup-subtitle">Password</div>
                    <input type="password" />
                </div>
                <Link id="blue-btn" to="/dashboard">Log in</Link>
            </form>
        </div>
    );
}

export default Login