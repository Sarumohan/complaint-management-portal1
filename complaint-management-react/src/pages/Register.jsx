import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/api";

import "../styles/register.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""

    });

    const [agree, setAgree] = useState(false);

    const [message, setMessage] = useState("");

    const [messageColor, setMessageColor] = useState("red");

    const [loading, setLoading] = useState(false);

    function handleChange(e){

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e){

        e.preventDefault();

        setMessage("");

        setMessageColor("red");

        if(

            !formData.fullName ||
            !formData.email ||
            !formData.phone ||
            !formData.password ||
            !formData.confirmPassword

        ){

            setMessage("Please fill all fields.");

            return;

        }

        if(formData.password !== formData.confirmPassword){

            setMessage("Passwords do not match.");

            return;

        }

        if(!agree){

            setMessage("Please accept Terms & Conditions.");

            return;

        }

        setLoading(true);

        try{

            const response = await registerUser({

                fullName: formData.fullName,

                email: formData.email.toLowerCase(),

                phone: formData.phone,

                password: formData.password

            });

            const data = await response.json();

            if(!response.ok){

                setMessage(data.message);

                return;

            }

            setMessageColor("green");

            setMessage(data.message);

            setTimeout(()=>{

                navigate("/login");

            },1500);

        }

        catch(error){

            console.log(error);

            setMessage("Unable to connect to server.");

        }

        finally {

            setLoading(false);

        }

    }

    return(

        <div className="register-page">

            {/* Logo */}

            <div className="top-logo">

                <i className="fa-solid fa-shield-halved"></i>

                <h2>

                    Complaint Management Portal

                </h2>

            </div>

            {/* Glass Card */}

            <div className="register-card">

                <h1>

                    Create Account

                </h1>

                <p>

                    Create your account to continue

                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-box">

                        <i className="fa-regular fa-user"></i>

                        <input

                            type="text"

                            name="fullName"

                            placeholder="Full Name"

                            value={formData.fullName}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="input-box">

                        <i className="fa-regular fa-envelope"></i>

                        <input

                            type="email"

                            name="email"

                            placeholder="Email Address"

                            value={formData.email}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="input-box">

                        <i className="fa-solid fa-phone"></i>

                        <input

                            type="text"

                            name="phone"

                            placeholder="Phone Number"

                            value={formData.phone}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="input-box">

                        <i className="fa-solid fa-lock"></i>

                        <input

                            type="password"

                            name="password"

                            placeholder="Create Password"

                            value={formData.password}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="input-box">

                        <i className="fa-solid fa-lock"></i>

                        <input

                            type="password"

                            name="confirmPassword"

                            placeholder="Confirm Password"

                            value={formData.confirmPassword}

                            onChange={handleChange}

                        />

                    </div>

                    <label className="terms">

                        <input

                            type="checkbox"

                            checked={agree}

                            onChange={(e)=>setAgree(e.target.checked)}

                        />

                        I agree to the Terms & Conditions

                    </label>

                    <div

                        className="register-message"

                        style={{color:messageColor}}

                    >

                        {message}

                    </div>

                    <button

                        type="submit"

                        className="register-btn"

                        disabled={loading}

                    >

                        {loading ? (
                            <span>
                                <i className="fa-solid fa-circle-notch fa-spin"></i> Creating Account...
                            </span>
                        ) : (
                            "Create Account"
                        )}

                    </button>

                </form>

                <div className="login-link">

                    <span>

                        Already have an account?

                    </span>

                    <Link to="/login">

                        Login

                    </Link>

                </div>

                <div className="home-link">

                    <Link to="/">

                        Back to Home

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Register;