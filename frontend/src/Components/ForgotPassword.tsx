import {Link} from "react-router-dom";

function ForgotPassword() {
    return (
        <div className="main">
            <span className="title">Flashier Cards</span>
            <form action="">
                <div>
                    <div className="sub-title">Email</div>
                    <input type="email" required />
                </div>
                <Link className="log-in-btn" to="/login">Continue</Link>
            </form>
        </div>
    );
}

export default ForgotPassword