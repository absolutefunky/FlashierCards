import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import type User from "../Interfaces/User";

function DeleteAccount() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [password, setPassword] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    const navigate = useNavigate();

    function showProfileOverlay(request: boolean) {
        setShowOverlay(request);
        if (!request) {
            setPassword("");
            setModalMessage("");
        }
    }

    function inputPassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    async function handleDeleteAccount(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setModalMessage("");

        const storedUser = sessionStorage.getItem("user");
        const user: User | null = storedUser ? JSON.parse(storedUser) : null;

        if (!user) {
            setModalMessage("No user found.");
            return;
        }

        if (!password.trim()) {
            setModalMessage("Please enter your password.");
            return;
        }

        try {

            const response = await fetch("http://localhost:5204/users/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: user.email,
                    password: password
                })
            });

            const data: { message?: string } = await response.json();

            if (!response.ok) {
                setModalMessage(data.message || "Could not delete account.");
                return;
            }

            sessionStorage.removeItem("user");
            sessionStorage.removeItem("isLoggedIn");

            navigate("/");
        } catch (error) {
            console.error("Delete account error:", error);
            setModalMessage("Could not connect to the server.");
        } 
    }

    return (
        <>
            <div id="profile-content">
                <div className="signup-subtitle">Delete Account</div>
                <div className="profile-text">
                    If you no longer wish to use Flashier Cards, you can permanently delete your account.
                </div>
                <button id="blue-btn" onClick={() => showProfileOverlay(true)}>
                    Delete My Account
                </button>
            </div>

            <div
                style={{ display: showOverlay ? "flex" : "none" }}
                className="overlay"
            >
                <div className="cancel-action">
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        onClick={() => showProfileOverlay(false)}
                    />
                </div>

                <div className="signup-subtitle" style={{ fontWeight: 600 }}>
                    Delete My Account
                </div>

                <div className="profile-text">
                    Are you sure you want to delete your account? This action cannot be undone.
                </div>

                <form onSubmit={handleDeleteAccount}>
                    <div>
                        <div className="signup-subtitle">
                            Please enter your password to confirm.
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={inputPassword}
                        />
                    </div>

                    <button id="blue-btn" type="submit">
                        Delete
                    </button>
                </form>

                {modalMessage && <p>{modalMessage}</p>}
            </div>
        </>
    );
}

export default DeleteAccount;