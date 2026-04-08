import { Link } from "react-router-dom";


function Verify() {
  return (
    <div id="verify-form">
      <span className="verify-title">Flashier Cards</span>
      <form action="">
        <div>
          <div className="verify-sub-title">Enter verification code from email</div>
          <input type="text" required />
        </div>
        <Link className="verify-form-blue-btn" to="/CreateNewPassword">
          Verify
        </Link>
      </form>
    </div>
  );
}

export default Verify;