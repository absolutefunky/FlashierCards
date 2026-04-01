import { Link } from "react-router-dom";
import "./login.css";

function Login() {
    return (
        <div id="login-main">
            <div className="title">Flashier Cards</div>
            <form action="">
                <div>
                    <div className="sub-title">Username</div>
                    <input type="text" />
                </div>
                 <div>
                    <div className="sub-title">Password</div>
                    <input type="password" />
                </div>
                <Link className="log-in-btn" to="/dashboard">Log in</Link>
            </form>
        </div>
    );
}

export default Login;