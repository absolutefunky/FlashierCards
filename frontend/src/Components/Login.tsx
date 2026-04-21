import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type User from "../Interfaces/User";

type LoginResponse = {
    message?: string;
    user: User;
};

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    function inputData(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function submitData(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!formData.email.trim() || !formData.password.trim()) {
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("http://localhost:5204/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email.trim(),
                    password: formData.password
                })
            });

            const data: LoginResponse | { message?: string } = await response.json();

            if (!response.ok) {
                return;
            }

            const user = (data as LoginResponse).user;

            sessionStorage.setItem("user", JSON.stringify(user));
            sessionStorage.setItem("isLoggedIn", "true");

            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            alert("Login error has occurred, try again!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div id="signup-content">
            <div id="signup-title">Flashier Cards</div>

            <form id="signup-form" onSubmit={submitData}>
                <div>
                    <div className="signup-subtitle">Email</div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={inputData}
                    />
                </div>

                <div>
                    <div className="signup-subtitle">Password</div>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={inputData}
                    />
                </div>

                <button id="blue-btn" type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Log in"}
                </button>
            </form>


            <Link id="blue-btn" to="/login/forgot-password">
                Forgot password?
            </Link>
        </div>
    );
}

export default Login;