import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";

  type ForgotPasswordState = {
    email: string;
    sqAnswer: string;
  };

  type ForgotPasswordResponse = {
    message?: string;
  };

function CreateNewPassword() {
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state as ForgotPasswordState | null;

    async function handleVerify(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      if (!state?.email || !state?.sqAnswer) {
        alert("Missing information, try again");
        navigate("/login/forgot-password");
        return;
      }

      if (!newPassword || !confirmPassword) {
        alert("Not all fields complete...");
        return;
      }

      if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5204/users/forgot-password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: state.email,
            sqAnswer: state.sqAnswer,
            newPassword,
            confirmNewPassword: confirmPassword,
          }),
        });

        const data: ForgotPasswordResponse = await response.json();

        if (!response.ok) {
          alert(data.message || "Password reset failed.");
          return;
        }

        alert("Password successfully reset!");
        navigate("/");
      } catch (error) {
        console.error("Forgot password error:", error);
        alert("An issue has occurred. Try again!");
      }
    }

    return (
      <div id="verify-form">
        <span className="verify-title">Flashier Cards</span>

        <form onSubmit={handleVerify}>
          <div>
            <div className="verify-sub-title">New Password</div>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
            />
          </div>

          <div>
            <div className="verify-sub-title">Confirm New Password</div>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>

          <button className="verify-form-blue-btn" type="submit">
            Verify
          </button>
        </form>
      </div>
    );
}

export default CreateNewPassword;