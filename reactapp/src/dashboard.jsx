import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import Particles from '../background/Particles/Particles';



function dashboard() {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            {/* Particles Background */}
            <div className="particles-background">
                <Particles
                    particleCount={350}
                    particleSpread={15}
                    speed={0.5}
                    particleColors={["#03e9f4", "#00c9ff", "#ffffff"]}
                    moveParticlesOnHover={true}
                    particleHoverFactor={2}
                    alphaParticles={true}
                    particleBaseSize={80}
                    sizeRandomness={2}
                    cameraDistance={25}
                />
            </div>
            {/* Fixed Navbar */}
            <div className='Navbar'>
                <div className="logo">
                    <img src="https://cdn-icons-png.flaticon.com/512/5968/5968381.png" alt="Logo" />
                    Techno
                </div>
                <div className='nav-links'>
                    <a href="/dashboard">Home</a>
                    <a href="/aboutus">About us</a>
                    <a href="/login">signup</a>
                </div>
            </div>
            {/* Main Content */}
            <div className='main-content'>
                <p className='heading1'> Employee Dashboard</p>
                <p className='heading2'>Management</p>
                <p className='heading3'>Comprehensive employee management system with advanced analytics, real-time tracking,and interactive dashboards to streamline operations and enhance productivity.</p>
                <p className='heading4'></p>
                {/* Add your content here */}
            </div>
            <div className='button-container'>
                <button className='btn1' onClick={() => navigate('/dashboardinner')}> Go to Dashboard</button>
                <button className='btn2' onClick={() => navigate('/EmployeeDirectory')}> view All Employees</button>
                <button className='btn3' onClick={() => navigate('/Wiki')}> 
                    <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#000000">
                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                    </svg>
                    Search Wiki
                </button>
            </div>

            <div className='icons'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{marginRight: "10px" , backgroundColor:"#03e9f4", borderRadius:"5px", padding:"20px" } } className='iconshover'><path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Z"/></svg>
                    <p className='num'>40</p>
                   <p className='names'>Total Employees</p>

                </div>
                 <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{marginRight: "10px" , backgroundColor:"#03e9f4", borderRadius:"5px", padding:"20px"} } className='iconshover'><path d="M120-120v-560h160v-160h400v320h160v400H520v-160h-80v160H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z"/></svg>
                    <p className='num'>8</p>
                   <p className='names'>Departments</p>

                </div>
                 <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{marginRight: "10px" , backgroundColor:"#03e9f4", borderRadius:"5px", padding:"20px"}} className='iconshover'><path d="M80-40v-80h800v80H80Zm80-120v-240q-33-54-51-114.5T91-638q0-61 15.5-120T143-874q8-21 26-33.5t40-12.5q31 0 53 21t18 50l-11 91q-6 48 8.5 91t43.5 75.5q29 32.5 70 52t89 19.5q60 0 120.5 12.5T706-472q45 23 69.5 58.5T800-326v166H400v-37q0-34 23-58.5t57-24.5h160v-80H480q-67 0-113.5 48T320-197v37H160Zm320-400q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Z"/></svg>
                    <p className='num'>93</p>
                   <p className='names'>Active Projects</p>

                </div>
                 <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{marginRight: "10px" , backgroundColor:"#03e9f4", borderRadius:"5px", padding:"20px"}} className='iconshover'><path d="M320-414v-306h120v306l-60-56-60 56Zm200 60v-526h120v406L520-354ZM120-216v-344h120v224L120-216Zm0 98 258-258 142 122 224-224h-64v-80h200v200h-80v-64L524-146 382-268 232-118H120Z"/></svg>
                    <p className='num'>4.7</p>
                   <p className='names'>Avg performance</p>

                </div>

            </div>

           
        </div>
    )
}
export default dashboard;