import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import employeeData from './employeeData.js';
import './EmployeeProfile.css';

const EmployeeProfileWrapper = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Prefer dynamic list from localStorage, fallback to static file
    let source = employeeData;
    try {
      const saved = localStorage.getItem('employees');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) source = parsed;
      }
    } catch {}
    const foundEmployee = source.find(emp => emp.id === parseInt(id));
    setEmployee(foundEmployee || null);
  }, [id]);

  if (!employee) {
    return (
      <div className="loading-container" style={{textAlign:'center'}}>
        <div>Employee not found.</div>
        <Link to="/employeeDirectory" className="back-button" style={{marginTop:'12px', display:'inline-block'}}>← Back to Directory</Link>
      </div>
    );
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
        <Link to="/employeeDirectory" className="back-button">
          ← Back to Directory
        </Link>
        <h1 style={{marginTop: '20px'}}>Employee Profile</h1>
      </div>
      
      <div className="profile-header" style={{marginTop: '20px'}}>
        <div className="profile-image-container">
          <img src={employee.image} alt={employee.name} className="profile-image" />
          <div className={`status-indicator ${employee.status.toLowerCase().replace(' ', '-')}`}></div>
        </div>
        <div className="profile-info">
          <h1>{employee.name}</h1>
          <h2>{employee.position}</h2>
          <div className="profile-meta">
            <div className="department-badge">{employee.department}</div>
            <div className={`status-badge ${employee.status.toLowerCase().replace(' ', '-')}`}>
              {employee.status}
            </div>
          </div>
          <p style={{marginTop: '10px', color: '#ccc'}}>Joined: {formatDate(employee.joinDate)}</p>
        </div>
      </div>
      
      <div className="profile-content" style={{marginTop: '30px'}}>
        <div className="profile-section contact-info">
          <h3>Contact Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">📧</div>
              <div className="info-content">
                <div className="info-label">Email</div>
                <div className="info-value">{employee.email}</div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📱</div>
              <div className="info-content">
                <div className="info-label">Phone</div>
                <div className="info-value">{employee.phone}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-section skills-section">
          <h3>Skills</h3>
          <div className="skills-container">
            {employee.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
        
        <div className="profile-section projects-section">
          <h3>Projects</h3>
          <ul style={{paddingLeft: '20px', margin: '0'}}>
            {employee.projects.map((project, index) => (
              <li key={index} style={{marginBottom: '8px'}}>{project}</li>
            ))}
          </ul>
        </div>
        
        <div className="profile-section performance-section">
          <h3>Performance Rating</h3>
          <div className="rating-container">
            <div className="rating-number">{employee.rating.toFixed(1)}</div>
            <div className="rating-stars">
              {renderStarRating(employee.rating)}
              <div className="rating-label">Overall Performance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileWrapper;