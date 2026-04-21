import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        sqAnswer: ""
    });


    function inputData(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function submitData(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {

            const response = await fetch("http://localhost:5204/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email.trim(),
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    sqAnswer: formData.sqAnswer.trim()
                })
            });

            if (!response.ok) {
                return;
            }
            setFormData({
                email: "",
                password: "",
                confirmPassword: "",
                sqAnswer: ""
            });
            navigate("/");
            
        } catch (error) {
            console.error("Signup error:", error);
            alert("Sign up error, try again!")
        } finally {

        }
    }

    return (
        <div id="signup-content">
            <div id="signup-title">Join Flashier Cards</div>

            <form id="signup-form" onSubmit={submitData}>

                <div>

                <div>
                    <div className="signup-subtitle">Email</div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={inputData}
                        />
                    </div>
                    <div className="signup-subtitle">Password</div>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={inputData}
                    />
                </div>

                <div>
                    <div className="signup-subtitle">Confirm Password</div>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={inputData}
                    />
                </div>

                <div>
                    <div className="signup-subtitle">Best Friend's Name?</div>
                    <input
                        type="text"
                        name="sqAnswer"
                        value={formData.sqAnswer}
                        onChange={inputData}
                    />
                </div>

                <input
                    id="blue-btn"
                    type="submit"
                />
                
            <Link id="blue-btn" to="/">
                Got An Account?
            </Link>
            </form>

        </div>
    );
}

export default Signup;