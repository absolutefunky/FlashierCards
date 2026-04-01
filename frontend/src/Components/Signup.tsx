function Signup() {
    return (
        <div id="signup-content">
            <div id="signup-title">Join Flashier Cards</div>
            <form id="signup-form" action="">
                <div>
                    <div className="signup-subtitle">Username</div>
                    <input type="text" />
                </div>
                <div className="signup-subtitle">
                    <div>Password</div>
                    <input type="password" />
                </div>
                <div className="signup-subtitle">
                    <div>Confirm Password</div>
                    <input type="password" />
                </div>
                <div className="signup-subtitle">
                    <div>Email</div>
                    <input type="email" />
                </div>
                <input id="blue-btn" type="submit" value={"Create account"} />
            </form>
        </div>
    );
}

export default Signup