import {Link} from "react-router-dom";

function ForgotPassword() {
    return (
        <div className="verify-form">
            <span className="verify-title">Flashier Cards</span>
            <form action="">
                <div>
                    <div className="verify-sub-title">Email</div>
                    <input type="text" required />
                </div>
                <Link className="verify-form-blue-btn" to="/verify">
                    Continue
                    </Link>
            </form>
        </div>
    );
}

export default ForgotPassword