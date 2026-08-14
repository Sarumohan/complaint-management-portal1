import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("red");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        setMessage("");

        const emailValue = email.trim().toLowerCase();

        if (!emailValue || !password) {

            setMessageColor("red");
            setMessage("Please enter email and password.");
            return;

        }

        setLoading(true);

        try {

            const response = await loginUser({

                email: emailValue,
                password

            });

            const data = await response.json();

            if (!response.ok) {

                setMessageColor("red");
                setMessage(data.message);
                return;

            }

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(data.user)
            );

            setMessageColor("green");
            setMessage(data.message);

            navigate("/dashboard");

        }

        catch (error) {

            console.log(error);

            setMessageColor("red");
            setMessage("Unable to connect to server.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="login-page">

            <div className="login-container">

                {/* LEFT SIDE */}

                <div className="login-left">

                    <div className="left-overlay">

                        <i className="fa-solid fa-shield-halved shield-icon"></i>

                        <h1>

                            Complaint
                            <br />
                            Management
                            <br />
                            Portal

                        </h1>

                        <div className="line"></div>

                        <p>

                            Your Voice. Our Priority.

                        </p>

                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div className="login-right">

                    <div className="login-card">

                        <div className="user-icon">

                            <i className="fa-regular fa-user"></i>

                        </div>

                        <h2>

                            Login

                        </h2>

                        <p className="subtitle">

                            Login to continue to your account

                        </p>

                        <form onSubmit={handleSubmit}>

                            <div className="input-box">

                                <i className="fa-regular fa-envelope left-icon"></i>

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="off"
                                />

                            </div>

                            <div className="input-box">

                                <i className="fa-solid fa-lock left-icon"></i>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <i
                                    className={
                                        showPassword
                                            ? "fa-regular fa-eye-slash right-icon"
                                            : "fa-regular fa-eye right-icon"
                                    }
                                    onClick={() => setShowPassword(!showPassword)}
                                ></i>

                            </div>

                            <div className="options">

                                <label>

                                    <input type="checkbox" />

                                    Remember Me

                                </label>

                                <a href="#">

                                    Forgot Password?

                                </a>

                            </div>

                            <div
                                className="login-message"
                                style={{ color: messageColor }}
                            >

                                {message}

                            </div>

                            <button
                                type="submit"
                                className="login-btn"
                                disabled={loading}
                            >

                                {loading ? (
                                    <span>
                                        <i className="fa-solid fa-circle-notch fa-spin"></i> Logging in...
                                    </span>
                                ) : (
                                    "Login"
                                )}

                            </button>

                        </form>

                        <div className="divider">

                            <span>OR</span>

                        </div>

                        <div className="register">

                            <span>

                                Don't have an account?

                            </span>

                            <Link to="/register">

                                Register Now

                            </Link>

                        </div>

                        <div className="home">

                            <Link to="/">

                                <i className="fa-solid fa-house"></i>

                                Back to Home

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;