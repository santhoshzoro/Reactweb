import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import './dbinner.css';

const ActiveProjects = () => {
  const navigate = useNavigate();
  const projectStatusData = {
    labels: ['On Track', 'Delayed', 'New'],
    datasets: [
      {
        label: 'Projects',
        data: [120, 15, 7],
        backgroundColor: ['#00ffff', '#ff6384', '#36a2eb'],
        borderColor: ['#00cccc', '#cc4f6b', '#2d8bc9'],
        borderWidth: 2,
      },
    ],
  };

  const projectTypeData = {
    labels: ['Web Development', 'Mobile Apps', 'Data Analytics', 'AI/ML', 'Infrastructure'],
    datasets: [
      {
        data: [45, 32, 28, 22, 15],
        backgroundColor: ['#03e9f4', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const monthlyProgressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Completed Projects',
        data: [12, 15, 18, 14, 20, 16],
        backgroundColor: 'rgba(3, 233, 244, 0.6)',
        borderColor: '#03e9f4',
        borderWidth: 2,
      },
      {
        label: 'Started Projects',
        data: [8, 12, 10, 16, 14, 18],
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
          <h2>Active Projects Dashboard</h2>
          <p>Comprehensive overview of all ongoing projects and their status.</p>
        </section>

        <section className="stats-cards">
          <div className="card">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{marginLeft: "90px", backgroundColor:"#03e9f4", borderRadius:"4px", padding:"20px"}} className='iconshover'>
              <path d="M120-120v-560h160v-160h400v320h160v400H520v-160h-80v160H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z"/>
            </svg>
            <h3>142</h3>
            <p>Total Active Projects</p>
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

          <div className="card">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{marginLeft: "90px", backgroundColor:"#03e9f4", borderRadius:"4px", padding:"20px"}} className='iconshover'>
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-480H200v480Zm80-80h400L545-450 440-320l-65-87-95 127Zm-80 80v-560 560Z"/>
            </svg>
            <h3>$2.4M</h3>
            <p>Total Budget</p>
            <div className='employee-stats'>
              <div className="stat-item">
                <span className="stat-value">$1.8M</span>
                <span className="stat-label">Allocated</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">$0.6M</span>
                <span className="stat-label">Available</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">75%</span>
                <span className="stat-label">Utilized</span>
              </div>
            </div>
          </div>

          <div className="card">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{marginLeft: "90px", backgroundColor:"#03e9f4", borderRadius:"4px", padding:"20px"}} className='iconshover'>
              <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q20-22 36-47.5t26.5-53q10.5-27.5 16-56.5t5.5-59q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z"/>
            </svg>
            <h3>85%</h3>
            <p>Success Rate</p>
            <div className='employee-stats'>
              <div className="stat-item">
                <span className="stat-value">121</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">21</span>
                <span className="stat-label">Failed</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">+5%</span>
                <span className="stat-label">Improvement</span>
              </div>
            </div>
          </div>
        </section>

        <section className="charts-row">
          <div className="chart-box">
            <h3>Project Status Overview</h3>
            <Bar data={projectStatusData} options={options} />
          </div>
          <div className="chart-box">
            <h3>Project Types Distribution</h3>
            <Doughnut data={projectTypeData} options={doughnutOptions} />
          </div>
        </section>

        <section className="charts-row">
          <div className="chart-box" style={{width: '100%'}}>
            <h3>Monthly Project Progress</h3>
            <Bar data={monthlyProgressData} options={options} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ActiveProjects;
