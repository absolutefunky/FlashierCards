import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/HomeForms.module.css";

type VerifyForgotPasswordResponse = {
  message?: string;
};

function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [sqAnswer, setSqAnswer] = useState<string>("");
  const [Loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  async function handleContinue(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !sqAnswer) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5204/users/verify-forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          sqAnswer,
        }),
      });

      const data: VerifyForgotPasswordResponse = await response.json();

      if (!response.ok) {
        alert(data.message || "Could not verify your information.");
        return;
      }

      navigate("/login/forgot-password/create-new-password", {
        state: { email, sqAnswer },
      });
    } catch (error) {
      console.error("Verification error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id={styles.content}>
      <div id={styles.title}>Flashier Cards</div>

      <form id={styles.signupForm} onSubmit={handleContinue}>
        <div>
          <div className={styles.subtitle}>Email</div>
          <input
            type="email"
            required
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div>
          <div className={styles.subtitle}>Name of your best friend</div>
          <input
            type="text"
            required
            value={sqAnswer}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSqAnswer(e.target.value)
            }
          />
        </div>

        <button
          type="submit"
          className={styles.homeBtn}
          style={{ marginTop: "0.5rem" }}
          disabled={Loading}
        >
          <span className={styles.loginShadow}></span>
          <span className={styles.loginEdge}></span>
          <span className={styles.loginFront}>
            {Loading ? "Checking..." : "Continue"}
          </span>
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;