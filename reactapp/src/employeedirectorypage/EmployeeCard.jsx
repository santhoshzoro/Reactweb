import React from 'react';
import { Link } from 'react-router-dom';
import './EmployeeCard.css';

const EmployeeCard = ({ employee }) => {
  return (
    <div className="employee-card">
      <div className="employee-card-header">
        <div className="employee-image">
          <img src={employee.image} alt={employee.name} />
          <div className={`status-indicator ${employee.status.toLowerCase().replace(' ', '-')}`}></div>
        </div>
        <div className="employee-name-title">
          <h3>{employee.name}</h3>
          <p className="position">{employee.position}</p>
        </div>
      </div>
      <div className="employee-card-body">
        <div className="employee-details">
          <div className="detail-item">
            <span className="detail-icon">📧</span>
            <span className="detail-text">{employee.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">📱</span>
            <span className="detail-text">{employee.phone}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">🏢</span>
            <span className="detail-text">{employee.department}</span>
          </div>
        </div>
      </div>
      <div className="employee-card-footer">
        <div className="employee-status">
          <span className={`status-badge ${employee.status.toLowerCase().replace(' ', '-')}`}>
            {employee.status}
          </span>
        </div>
        <Link to={`/employeeProfile/${employee.id}`} className="view-profile-btn">
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default EmployeeCard;