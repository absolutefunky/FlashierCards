import { Link } from "react-router-dom";


function CreateNewPassword() {
  return (
    <div id="verify-form">
      <span className="verify-title">Flashier Cards</span>
      <form action="">
        <div>
          <div className="verify-sub-title">New Password</div>
          <input type="text" required />
        </div>
         <div className="verify-sub-title">Confirm New Password</div>
            <input type="password" required />
        <Link className="verify-form-blue-btn" to="/dashboard">
          Verify
        </Link>
      </form>
    </div>
  );
}

export default CreateNewPassword;