import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import employeeData from './employeeData.js';
import './EmployeeProfile.css';

const EmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Make sure employeeData is properly imported
    console.log("Employees data:", employeeData);
    const foundEmployee = employeeData.find(emp => emp.id === parseInt(id));
    console.log("Found employee:", foundEmployee);
    setEmployee(foundEmployee);
  }, [id]);

  if (!employee) {
    return <div className="loading-container">Loading employee data...</div>;
  }

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Generate star rating display
  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="star-rating">
        {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`} className="star full">★</span>)}
        {hasHalfStar && <span className="star half">★</span>}
        {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className="star empty">☆</span>)}
      </div>
    );
  };

  return (
    <div className="employee-profile">
      <div className="profile-header-container">
        <Link to="/employeeDirectory" className="back-button">← Back to Directory</Link>
        
        <div className="profile-header">
          <div className="profile-image-container">
            <img src={employee.image} alt={employee.name} className="profile-image" />
            <div className={`status-indicator ${employee.status.toLowerCase().replace(' ', '-')}`}></div>
          </div>
          <div className="profile-info">
            <h1>{employee.name}</h1>
            <h2>{employee.position}</h2>
            <div className="profile-meta">
              <span className="department-badge">{employee.department}</span>
              <span className={`status-badge ${employee.status.toLowerCase().replace(' ', '-')}`}>
                {employee.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section contact-info">
          <h3>Contact Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">📧</div>
              <div className="info-content">
                <span className="info-label">Email</span>
                <span className="info-value">{employee.email}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📱</div>
              <div className="info-content">
                <span className="info-label">Phone</span>
                <span className="info-value">{employee.phone}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📅</div>
              <div className="info-content">
                <span className="info-label">Join Date</span>
                <span className="info-value">{formatDate(employee.joinDate)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-section skills-section">
          <h3>Skills & Expertise</h3>
          <div className="skills-container">
            {employee.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        <div className="profile-section projects-section">
          <h3>Current Projects</h3>
          <div className="projects-container">
            {employee.projects.map((project, index) => (
              <div key={index} className="project-card">
                <h4>{project}</h4>
                <div className="project-progress">
                  <div 
                    className="progress-bar" 
                    style={{width: `${Math.floor(Math.random() * 100)}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section performance-section">
          <h3>Performance Overview</h3>
          <div className="performance-container">
            <div className="rating-container">
              <div className="rating-number">{employee.rating}</div>
              <div className="rating-stars">
                {renderStarRating(employee.rating)}
                <div className="rating-label">Overall Rating</div>
              </div>
            </div>
            <div className="performance-stats">
              <div className="stat-item">
                <div className="stat-value">98%</div>
                <div className="stat-label">Task Completion</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">95%</div>
                <div className="stat-label">On-time Delivery</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">4.7</div>
                <div className="stat-label">Team Collaboration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;