import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import employeeData from './employeeData.js';
import './EmployeeProfile.css';

const EmployeeProfileWrapper = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  // Auth state
  const [auth] = useState(() => {
    try {
      const raw = localStorage.getItem('auth');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });
  const isAdmin = auth?.role === 'admin';

  // For edit mode
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState(null);

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

  useEffect(() => {
    if (employee) {
      setDraft({
        name: employee.name,
        position: employee.position,
        department: employee.department,
        email: employee.email,
        phone: employee.phone,
        status: employee.status,
        joinDate: employee.joinDate,
        image: employee.image,
        skills: employee.skills.join(', '),
        projects: employee.projects.join(', '),
        rating: employee.rating
      });
    }
  }, [employee]);

  if (!employee) {
    return (
      <div className="loading-container" style={{textAlign:'center'}}>
        <div>Employee not found.</div>
        <Link to="/employeeDirectory" className="back-button" style={{marginTop:'12px', display:'inline-block'}}>← Back to Directory</Link>
      </div>
    );
  }

  const canEdit = isAdmin || (auth?.email && auth.email === employee.email);

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
        {canEdit && (
          <button className="back-button" onClick={() => setEditMode(prev => !prev)} style={{ marginLeft: 'auto' }}>
            {editMode ? 'Cancel' : 'Edit Profile'}
          </button>
        )}
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
      
      {editMode && canEdit && draft ? (
        <div className="profile-section" style={{ marginTop: '20px' }}>
          <h3>Edit Profile</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input className="filter-select" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} placeholder="Name" />
            <input className="filter-select" value={draft.position} onChange={e => setDraft({ ...draft, position: e.target.value })} placeholder="Position" />
            <input className="filter-select" value={draft.department} onChange={e => setDraft({ ...draft, department: e.target.value })} placeholder="Department" />
            <input className="filter-select" value={draft.email} onChange={e => setDraft({ ...draft, email: e.target.value })} placeholder="Email" />
            <input className="filter-select" value={draft.phone} onChange={e => setDraft({ ...draft, phone: e.target.value })} placeholder="Phone" />
            <select className="filter-select" value={draft.status} onChange={e => setDraft({ ...draft, status: e.target.value })}>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Remote">Remote</option>
            </select>
            <input type="date" className="filter-select" value={draft.joinDate} onChange={e => setDraft({ ...draft, joinDate: e.target.value })} />
            <input className="filter-select" value={draft.image} onChange={e => setDraft({ ...draft, image: e.target.value })} placeholder="Image URL" />
            <input className="filter-select" value={draft.skills} onChange={e => setDraft({ ...draft, skills: e.target.value })} placeholder="Skills (comma separated)" />
            <input className="filter-select" value={draft.projects} onChange={e => setDraft({ ...draft, projects: e.target.value })} placeholder="Projects (comma separated)" />
            <input type="number" step="0.1" min="0" max="5" className="filter-select" value={draft.rating} onChange={e => setDraft({ ...draft, rating: e.target.value })} placeholder="Rating (0-5)" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <button
              className="view-profile-btn"
              onClick={() => {
                try {
                  const saved = localStorage.getItem('employees');
                  let list = saved ? JSON.parse(saved) : null;
                  if (!Array.isArray(list) || !list.length) {
                    list = [...employeeData];
                  }
                  const updatedList = list.map(e =>
                    e.id === employee.id
                      ? {
                          ...e,
                          name: draft.name.trim(),
                          position: draft.position.trim(),
                          department: draft.department.trim(),
                          email: draft.email.trim(),
                          phone: draft.phone.trim(),
                          status: draft.status,
                          joinDate: draft.joinDate,
                          image: draft.image || e.image,
                          skills: draft.skills ? draft.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
                          projects: draft.projects ? draft.projects.split(',').map(p => p.trim()).filter(Boolean) : [],
                          rating: parseFloat(draft.rating) || e.rating
                        }
                      : e
                  );
                  localStorage.setItem('employees', JSON.stringify(updatedList));
                  alert('Profile saved');
                  setEditMode(false);
                  const refreshed = updatedList.find(emp => emp.id === employee.id);
                  setEmployee(refreshed || employee);
                } catch (err) {
                  alert('Failed to save.');
                }
              }}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default EmployeeProfileWrapper;