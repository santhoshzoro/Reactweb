import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import LightRays from '../lightrayslogin/LightRays/LightRays';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState('user'); // demo-only role picker
    const navigate = useNavigate(); // enable routing after login

    // Demo mode: accept any credentials; choose role via dropdown
    function handleLogin() {
        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }
        try {
            localStorage.setItem('auth', JSON.stringify({ email, role }));
        } catch {}
        alert(`Login successful as ${role}!`);
        navigate("/dashboard");
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
            <div>
                 {/* Welcome animated heading */}
            <h1 className="welcome-hero">Welcome to Techno corp</h1>
            </div>
            <br />
            

            {/* Login Form */}
            <div className="container">
                <div className="card">
                    <h2 className="title">Login</h2>
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

                        {/* Demo-only role picker */}
                        <div className="inputBox">
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                            <span>Role</span>
                        </div>
            
                    <button className="loginBtn" onClick={handleLogin}>Sign In</button>

                </div>
            </div>
        </>
    )
}

export default Login;