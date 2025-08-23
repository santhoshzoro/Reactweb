import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import LightRays from '../lightrayslogin/LightRays/LightRays';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // enable routing after login

    // Hardcoded credentials (later you can replace with API call)
    const validEmail = "test@example.com";
    const validPassword = "123456";

    function handleLogin() {
        if (email === validEmail && password === validPassword) {
            alert("Login successful!");
            navigate("/dashboard");
        } else {
            alert("Invalid email or password. Please try again.");
        }
    }



    return (
        <>
            {/* LightRays Background Effect */}
            <div className="light-rays-background">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#03e9f4"
                    raysSpeed={1.2}
                    lightSpread={1.5}
                    rayLength={2.5}
                    pulsating={true}
                    fadeDistance={1.2}
                    followMouse={true}
                    mouseInfluence={0.15}
                />
            </div>

            {/* Welcome animated heading */}
            <h1 className="welcome-hero">Welcome to Techno corp</h1>

            {/* Login Form */}
            <div className="container">
                <div className="card">
                    <h2 className="title">Welcome Back</h2>
                        <div className="inputBox">
                            <input
                                type="text"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <span>Email</span>
                        </div>
                        <div className="inputBox">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span>Password</span>
                        </div>
            
                    <button className="loginBtn" onClick={handleLogin}>Sign In</button>

                </div>
            </div>
        </>
    )
}

export default Login;