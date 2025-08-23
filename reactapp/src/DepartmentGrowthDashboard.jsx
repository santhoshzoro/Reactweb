import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './dbinner.css';

const DepartmentGrowthDashboard = () => {
  const navigate = useNavigate();
  const growthTrendData = {
    labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
    datasets: [
      {
        label: 'Engineering',
        data: [25, 28, 32, 35, 38, 42],
        borderColor: '#03e9f4',
        backgroundColor: 'rgba(3, 233, 244, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Design',
        data: [8, 9, 10, 11, 12, 13],
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Marketing',
        data: [12, 13, 14, 15, 16, 18],
        borderColor: '#4ecdc4',
        backgroundColor: 'rgba(78, 205, 196, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Product',
        data: [6, 7, 8, 9, 10, 11],
        borderColor: '#45b7d1',
        backgroundColor: 'rgba(69, 183, 209, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const departmentDistributionData = {
    labels: ['Engineering', 'Marketing', 'Design', 'Product', 'Sales', 'HR', 'Operations'],
    datasets: [
      {
        data: [42, 18, 13, 11, 8, 5, 3],
        backgroundColor: [
          '#03e9f4',
          '#4ecdc4',
          '#ff6b6b',
          '#45b7d1',
          '#96ceb4',
          '#feca57',
          '#ff9ff3'
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const hiringTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Hires',
        data: [5, 8, 6, 12, 9, 15],
        backgroundColor: 'rgba(3, 233, 244, 0.6)',
        borderColor: '#03e9f4',
        borderWidth: 2,
      },
      {
        label: 'Departures',
        data: [2, 3, 1, 4, 2, 3],
        backgroundColor: 'rgba(255, 107, 107, 0.6)',
        borderColor: '#ff6b6b',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
        },
      },
    },
    scales: {
      y: { 
        beginAtZero: true,
        ticks: {
          color: '#fff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#fff',
        },
      },
    },
  };

  return (
    <div className="dashboard-inner" style={{paddingTop: '750px'}}>
      <div className="content" style={{marginTop: '0px', paddingTop: '30px'}}>
        <div className="back-button-container" style={{marginBottom: '20px', textAlign: 'center', marginTop: '30px'}}>
          <button 
            className="back-button" 
            onClick={() => navigate('/dashboardInner')}
            style={{
              background: 'linear-gradient(45deg, #03e9f4, #00c9ff)',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '25px',
              color: '#000',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(3, 233, 244, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(3, 233, 244, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(3, 233, 244, 0.3)';
            }}
          >
            ← Back to Dashboard
          </button>
        </div>
        
        <section className="welcome-section" style={{marginTop: '0px'}}>
          <h2>Department Growth Analytics</h2>
          <p>Track departmental expansion, hiring trends, and organizational development.</p>
        </section>

        <section className="stats-cards">
          <div className="card">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{marginLeft: "110px", backgroundColor:"#03e9f4", borderRadius:"4px", padding:"20px"}} className='iconshover'>
              <path d="M320-414v-306h120v306l-60-56-60 56Zm200 60v-526h120v406L520-354ZM120-216v-344h120v224L120-216Zm0 98 258-258 142 122 224-224h-64v-80h200v200h-80v-64L524-146 382-268 232-118H120Z"/>
            </svg>
            <h3>8</h3>
            <p>Departments</p>
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

          <div className="card">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{marginLeft: "105px", backgroundColor:"#03e9f4", borderRadius:"4px", padding:"20px"}} className='iconshover'>
              <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Z"/>
            </svg>
            <h3>55</h3>
            <p>New Hires (6 months)</p>
            <div className='employee-stats'>
              <div className="stat-item">
                <span className="stat-value">25</span>
                <span className="stat-label">Engineering</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">12</span>
                <span className="stat-label">Marketing</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">18</span>
                <span className="stat-label">Others</span>
              </div>
            </div>
          </div>

          <div className="card">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{marginLeft: "110px", backgroundColor:"#03e9f4", borderRadius:"4px", padding:"20px"}} className='iconshover'>
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-480H200v480Zm80-80h400L545-450 440-320l-65-87-95 127Zm-80 80v-560 560Z"/>
            </svg>
            <h3>15</h3>
            <p>Departures (6 months)</p>
            <div className='employee-stats'>
              <div className="stat-item">
                <span className="stat-value">3.8%</span>
                <span className="stat-label">Turnover Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">8</span>
                <span className="stat-label">Voluntary</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">7</span>
                <span className="stat-label">Retirement</span>
              </div>
            </div>
          </div>

          <div className="card">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{marginLeft: "105px", backgroundColor:"#03e9f4", borderRadius:"4px", padding:"20px"}} className='iconshover'>
              <path d="M480-120 200-272v-240L40-600l440-240 440 240-160 88v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/>
            </svg>
            <h3>25%</h3>
            <p>Overall Growth Rate</p>
            <div className='employee-stats'>
              <div className="stat-item">
                <span className="stat-value">40</span>
                <span className="stat-label">Net Growth</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">Q2</span>
                <span className="stat-label">Peak Quarter</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">+8%</span>
                <span className="stat-label">YoY Growth</span>
              </div>
            </div>
          </div>
        </section>

        <section className="charts-row">
          <div className="chart-box">
            <h3>Department Growth Trends</h3>
            <Line data={growthTrendData} options={options} />
          </div>
          <div className="chart-box">
            <h3>Current Department Distribution</h3>
            <Doughnut data={departmentDistributionData} options={doughnutOptions} />
          </div>
        </section>

        <section className="charts-row">
          <div className="chart-box" style={{width: '100%'}}>
            <h3>Hiring vs Departures Trend</h3>
            <Bar data={hiringTrendsData} options={options} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DepartmentGrowthDashboard;