import { Link } from "react-router-dom";


function Verify() {
  return (
    <div className="main">
      <span className="title">Flashier Cards</span>
      <form action="">
        <div>
          <div className="sub-title">Enter verification code from email</div>
          <input type="text" required />
        </div>
        <Link className="login-btn" to="/home">
          Verify
        </Link>
      </form>
    </div>
  );
}

export default Verify;