
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './dbinner.css';

const Dashboardinner = () => {
  const navigate = useNavigate();
  
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Performance',
      data: [80, 85, 90, 88, 92, 89],
      backgroundColor: 'rgba(0, 200, 255, 0.6)'
    }]
  };

  const pieData = {
    labels: ['Engineering', 'Product', 'Design', 'Marketing'],
    datasets: [{
      data: [40, 20, 15, 25],
      backgroundColor: ['#0ff', '#0f0', '#ff0', '#f00']
    }]
  };
 
 






  return (
    <div className="dashboard-inner">
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
      <div className="content">
        <section className="welcome-section">
          <h2>Welcome back, John Employee!</h2>
          <p>Here's what's happening with your team today.</p>
        </section>

        <section className="stats-cards">
          <div className="card" onClick={() => navigate('/employeeDirectory')} style={{cursor: 'pointer'}}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{marginLeft: "90px", backgroundColor:"#03e9f4", borderRadius:"4px", padding:"20px"}} className='iconshover'>
                <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Z"/>
              </svg>
            <h3>40</h3>
            <p>Total Employees</p>
            <div className='employee-stats'>
              <div className="stat-item">
                <span className="stat-value">39</span>
                <span className="stat-label">Active</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">-1</span>
                <span className="stat-label">Inactive</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">+2</span>
                <span className="stat-label">New Hires</span>
              </div>
            </div>
          </div>
          <div className="card" onClick={() => navigate('/ActiveProjects')} style={{cursor: 'pointer'}}>
           <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="16px" fill="#000000" style={{marginLeft: "90px", backgroundColor:"#03e9f4", borderRadius:"5px", padding:"20px"} } className='iconshover'>
           <path d="M120-120v-560h160v-160h400v320h160v400H520v-160h-80v160H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z"/></svg>

            <h3>142</h3>
            <p>Active Projects</p>

            <div className='employee-stats'>
              <div className="stat-item">
                <span className="stat-value">120</span>
                <span className="stat-label">On Track</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">15</span>
                <span className="stat-label">Delayed</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">7</span>
                <span className="stat-label">New</span>
              </div>
            </div>
          </div>
          <div className="card" onClick={() => navigate('/PerformanceDashboard')} style={{cursor: 'pointer'}}>
           <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="16px" fill="#000000" style={{marginLeft: "90px" , backgroundColor:"#03e9f4", borderRadius:"5px", padding:"20px"}} className='iconshover'>
           <path d="M80-40v-80h800v80H80Zm80-120v-240q-33-54-51-114.5T91-638q0-61 15.5-120T143-874q8-21 26-33.5t40-12.5q31 0 53 21t18 50l-11 91q-6 48 8.5 91t43.5 75.5q29 32.5 70 52t89 19.5q60 0 120.5 12.5T706-472q45 23 69.5 58.5T800-326v166H400v-37q0-34 23-58.5t57-24.5h160v-80H480q-67 0-113.5 48T320-197v37H160Zm320-400q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Z"/></svg>
            <h3>4.7</h3>
            <p>Avg Performance</p>

            <div className='employee-stats'>
              <div className="stat-item">
                <span className="stat-value">5.0</span>
                <span className="stat-label">Top</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">4.2</span>
                <span className="stat-label">Lowest</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">+0.3</span>
                <span className="stat-label">Growth</span>
              </div>
            </div>
          </div>
          <div className="card" onClick={() => navigate('/DepartmentGrowthDashboard')} style={{cursor: 'pointer'}}>
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{marginLeft: "90px" , backgroundColor:"#03e9f4", borderRadius:"5px", padding:"20px"}} className='iconshover'>
           <path d="M320-414v-306h120v306l-60-56-60 56Zm200 60v-526h120v406L520-354ZM120-216v-344h120v224L120-216Zm0 98 258-258 142 122 224-224h-64v-80h200v200h-80v-64L524-146 382-268 232-118H120Z"/></svg>
            <h3>8</h3>
            <p>Department Growth</p>
            <div className='employee-stats'>
              <div className="stat-item">
                <span className="stat-value">+12%</span>
                <span className="stat-label">Engineering</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">+5%</span>
                <span className="stat-label">Design</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">+7%</span>
                <span className="stat-label">Marketing</span>
              </div>
            </div>
          </div>
        </section>
        <section className="charts-row">
          <div className="chart-box">
            <h3>Performance Overview</h3>
            <Bar data={barData} />
          </div>
          <div className="chart-box">
            <h3>Department Distribution</h3>
            <Pie data={pieData} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboardinner;
