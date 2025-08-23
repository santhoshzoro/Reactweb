import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Line, Radar, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './dbinner.css';

const PerformanceDashboard = () => {
  const navigate = useNavigate();
  const performanceTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Performance',
        data: [4.2, 4.3, 4.5, 4.4, 4.7, 4.6],
        borderColor: '#03e9f4',
        backgroundColor: 'rgba(3, 233, 244, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Target Performance',
        data: [4.5, 4.5, 4.5, 4.5, 4.5, 4.5],
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  const departmentPerformanceData = {
    labels: ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR'],
    datasets: [
      {
        label: 'Current Performance',
        data: [4.8, 4.5, 4.6, 4.3, 4.4, 4.2],
        backgroundColor: 'rgba(3, 233, 244, 0.6)',
        borderColor: '#03e9f4',
        borderWidth: 2,
      },
    ],
  };

  const skillsRadarData = {
    labels: ['Technical Skills', 'Communication', 'Leadership', 'Problem Solving', 'Creativity', 'Teamwork'],
    datasets: [
      {
        label: 'Company Average',
        data: [4.5, 4.2, 3.8, 4.6, 4.1, 4.4],
        backgroundColor: 'rgba(3, 233, 244, 0.2)',
        borderColor: '#03e9f4',
        borderWidth: 2,
      },
      {
        label: 'Industry Benchmark',
        data: [4.0, 4.0, 4.0, 4.0, 4.0, 4.0],
        backgroundColor: 'rgba(255, 107, 107, 0.2)',
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
        max: 5,
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

  const radarOptions = {
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
      r: {
        beginAtZero: true,
        max: 5,
        ticks: {
          color: '#fff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        pointLabels: {
          color: '#fff',
        },
      },
    },
  };

  return (
    <div className="dashboard-inner" style={{paddingTop: '1150px'}}>
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
          <h2>Performance Analytics Dashboard</h2>
          <p>Comprehensive analysis of employee performance metrics and trends.</p>
        </section>

        <section className="stats-cards">
          <div className="card">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{marginLeft: "105px", backgroundColor:"#03e9f4", borderRadius:"4px", padding:"20px"}} className='iconshover'>
              <path d="M80-40v-80h800v80H80Zm80-120v-240q-33-54-51-114.5T91-638q0-61 15.5-120T143-874q8-21 26-33.5t40-12.5q31 0 53 21t18 50l-11 91q-6 48 8.5 91t43.5 75.5q29 32.5 70 52t89 19.5q60 0 120.5 12.5T706-472q45 23 69.5 58.5T800-326v166H400v-37q0-34 23-58.5t57-24.5h160v-80H480q-67 0-113.5 48T320-197v37H160Zm320-400q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Z"/>
            </svg>
            <h3>4.7</h3>
            <p>Average Performance</p>
            <div className='employee-stats'>
              <div className="stat-item">
                <span className="stat-value">5.0</span>
                <span className="stat-label">Top Performer</span>
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

          <div className="card">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{marginLeft: "105px", backgroundColor:"#03e9f4", borderRadius:"4px", padding:"20px"}} className='iconshover'>
              <path d="M320-414v-306h120v306l-60-56-60 56Zm200 60v-526h120v406L520-354ZM120-216v-344h120v224L120-216Zm0 98 258-258 142 122 224-224h-64v-80h200v200h-80v-64L524-146 382-268 232-118H120Z"/>
            </svg>
            <h3>92%</h3>
            <p>Goal Achievement</p>
            <div className='employee-stats'>
              <div className="stat-item">
                <span className="stat-value">37</span>
                <span className="stat-label">Exceeded</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">2</span>
                <span className="stat-label">Met</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">1</span>
                <span className="stat-label">Below</span>
              </div>
            </div>
          </div>

          <div className="card">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{marginLeft: "105px", backgroundColor:"#03e9f4", borderRadius:"4px", padding:"20px"}} className='iconshover'>
              <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-43-61v-82q-35 0-59-26t-24-61v-44L149-459q-5 20-7 39.5t-2 39.5q0 130 84.5 227T440-141Zm351-78q28-35 44.5-75.5T852-480q0-34-8.5-66t-23.5-62L716-504v84q0 35-24 61t-59 26h-87v87q0 17-11.5 28.5T506-206h-39v67q31-3 60.5-11t56.5-24Z"/>
            </svg>
            <h3>15</h3>
            <p>Training Programs</p>
            <div className='employee-stats'>
              <div className="stat-item">
                <span className="stat-value">8</span>
                <span className="stat-label">Active</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">5</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">2</span>
                <span className="stat-label">Planned</span>
              </div>
            </div>
          </div>

          <div className="card">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{marginLeft: "105px", backgroundColor:"#03e9f4", borderRadius:"4px", padding:"20px"}} className='iconshover'>
              <path d="M480-120 200-272v-240L40-600l440-240 440 240-160 88v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/>
            </svg>
            <h3>96%</h3>
            <p>Satisfaction Rate</p>
            <div className='employee-stats'>
              <div className="stat-item">
                <span className="stat-value">38</span>
                <span className="stat-label">Very Satisfied</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">1</span>
                <span className="stat-label">Satisfied</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">1</span>
                <span className="stat-label">Neutral</span>
              </div>
            </div>
          </div>
        </section>

        <section className="charts-row">
          <div className="chart-box">
            <h3>Performance Trend Analysis</h3>
            <Line data={performanceTrendData} options={options} />
          </div>
          <div className="chart-box">
            <h3>Department Performance Comparison</h3>
            <Bar data={departmentPerformanceData} options={options} />
          </div>
        </section>

        <section className="charts-row">
          <div className="chart-box" style={{width: '100%'}}>
            <h3>Skills Assessment Radar</h3>
            <Radar data={skillsRadarData} options={radarOptions} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PerformanceDashboard;