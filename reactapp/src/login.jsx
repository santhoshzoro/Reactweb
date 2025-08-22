import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import LightRays from '../lightrayslogin/LightRays/LightRays';


function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    alert("Login successful!");
    navigate('/dashboard');
  }

  



    return(
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
            
            {/* Login Form */}
            <div className="container">
                <div className="card">
                    <h2 className="title">Welcome Back</h2>
                    <div className="inputBox">
                        <input type="text" required />
                        <span>Email</span>
                    </div>
                    <div className="inputBox">
                        <input type="password" required />
                        <span>Password</span>
                    </div>
                    <button className="loginBtn"  onClick={handleLogin}>Sign In</button>
                    
                </div>
            </div>
        </>
    )
}

export default Login;