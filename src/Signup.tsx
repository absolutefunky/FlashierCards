import { Link } from "react-router-dom";
import "./signup.css"

function Signup() {
    return (
        <div id="signup-main">
            <div className="title">Join Flashier Cards</div>
            <form action="">
                <div>
                    <div className="sub-title">Username</div>
                    <input type="text" />
                </div>
                 <div>
                    <div className="sub-title">Password</div>
                    <input type="password" />
                </div>
                <div>
                    <div className="sub-title">Confirm Password</div>
                    <input type="password" />
                </div>
                <div>
                <div className="sub-title">Email</div>
                    <input type="email" />
                </div>
                <Link className="create-btn" to="/dashboard">Create account</Link>
            </form>
        </div>
    );
}

export default Signup;