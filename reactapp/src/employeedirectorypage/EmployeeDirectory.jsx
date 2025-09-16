import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import employeeData from './employeeData.js';
import './EmployeeDirectory.css';
import './EmployeeCard.css';
import SearchBar from './SearchBar';
import PaginationComponent from './PaginationComponent';


const EmployeeDirectory = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(employeeData);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEmployees, setFilteredEmployees] = useState(employeeData);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showNewEmp, setShowNewEmp] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    status: 'Active',
    joinDate: '',
    image: '',
    skills: '',
    projects: '',
    rating: '4.0'
  });

  // Auth and role from localStorage
  const [auth] = useState(() => {
    try {
      const raw = localStorage.getItem('auth');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const isAdmin = auth?.role === 'admin';
  const currentUserEmail = auth?.email || '';
  
  // Load from localStorage on mount (so new employees persist across refresh)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('employees');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) {
          setEmployees(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not parse saved employees');
    }
  }, []);

  const employeesPerPage = 9; // Changed from 10 to 9 (3x3 grid)

  useEffect(() => {
    let filtered = employees;
    
    if (searchTerm) {
      filtered = filtered.filter(employee => 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (departmentFilter !== 'All') {
      filtered = filtered.filter(employee => employee.department === departmentFilter);
    }
    
    if (statusFilter !== 'All') {
      filtered = filtered.filter(employee => employee.status === statusFilter);
    }
    
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'department') {
        return sortOrder === 'asc' 
          ? a.department.localeCompare(b.department) 
          : b.department.localeCompare(a.department);
      } else if (sortBy === 'joinDate') {
        return sortOrder === 'asc' 
          ? new Date(a.joinDate) - new Date(b.joinDate) 
          : new Date(b.joinDate) - new Date(a.joinDate);
      }
      return 0;
    });
    
    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [employees, searchTerm, departmentFilter, statusFilter, sortBy, sortOrder]);

  // Get current employees for pagination
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
  };

  // Get unique departments for filter dropdown
  const departments = ['All', ...new Set(employees.map(employee => employee.department))];

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle sort change
  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Handle new employee form field changes
  const handleNewEmpChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new employee and append to list
  const handleAddNewEmp = (e) => {
    e.preventDefault();
    if (!isAdmin) {
      alert('Only admins can add new employees.');
      return;
    }
    const nextId = employees.reduce((max, emp) => Math.max(max, emp.id), 0) + 1;
    const newEmp = {
      id: nextId,
      name: newEmployee.name.trim(),
      position: newEmployee.position.trim(),
      department: newEmployee.department.trim(),
      email: newEmployee.email.trim(),
      phone: newEmployee.phone.trim(),
      status: newEmployee.status,
      joinDate: newEmployee.joinDate,
      image: newEmployee.image || 'https://via.placeholder.com/150',
      skills: newEmployee.skills
        ? newEmployee.skills.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      projects: newEmployee.projects
        ? newEmployee.projects.split(',').map((p) => p.trim()).filter(Boolean)
        : [],
      rating: parseFloat(newEmployee.rating) || 4.0,
    };

    setEmployees((prev) => {
      const updated = [...prev, newEmp];
      // Save to localStorage for persistence
      try { localStorage.setItem('employees', JSON.stringify(updated)); } catch {}
      return updated;
    });
    setShowNewEmp(false);
    setNewEmployee({
      name: '',
      position: '',
      department: '',
      email: '',
      phone: '',
      status: 'Active',
      joinDate: '',
      image: '',
      skills: '',
      projects: '',
      rating: '4.0',
    });
    setCurrentPage(1);
  };

  return (
    <div  className="employee-directory-page">
    <div className="employee-directory">
      <div className="directory-header">
        <h4>Employee Directory</h4>
        <button className="back-button" onClick={() => navigate('/dashboardInner')}>
          Back to Dashboard
        </button>
      </div>
      
      <div className={`content-container content-container-page-${currentPage}`}>
        <div className={`search-filter-container search-filter-container-page-${currentPage}`}>
          <h3 style={{color: '#03e9f4', marginTop: 0, marginBottom: '10px', textAlign: 'center'}}>Search & Filter</h3>
          <div style={{marginBottom: '10px', width: '80%'}}>
            <SearchBar onSearch={setSearchTerm} />
          </div>
        
        <div className="filter-container">
          <div className="filter-group">
            <label>Department:</label>
            <select 
              value={departmentFilter} 
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="filter-select"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Status:</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          
          <div className="filter-group sort-group">
            <label>Sort By:</label>
            <div className="sort-buttons">
              <button 
                className={`sort-button ${sortBy === 'name' ? 'active' : ''}`}
                onClick={() => handleSortChange('name')}
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button 
                className={`sort-button ${sortBy === 'department' ? 'active' : ''}`}
                onClick={() => handleSortChange('department')}
              >
                Department {sortBy === 'department' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button 
                className={`sort-button ${sortBy === 'joinDate' ? 'active' : ''}`}
                onClick={() => handleSortChange('joinDate')}
              >
                Join Date {sortBy === 'joinDate' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>

          {/* New Employee Section toggle (moved to its own row below filters) */}
          {/* <div style={{ marginTop: '16px', width: '50%', display: 'flex', justifyContent: 'flex', alignItems: 'center', padding: '10px', borderRadius: '8px', }}> */}
            {isAdmin && (
              <button
                className="sort-button"
                style={{ border: '1px solid #03e9f4', padding: '8px 16px', borderRadius: '4px', background: '#111', color: '#03e9f4', cursor: 'pointer', marginLeft: '50px' }}
                onClick={() => setShowNewEmp(true)}
              >
                Add New +
              </button>
            )}
          {/* </div> */}

          {/* Lightweight modal to prevent layout shift */}
          {showNewEmp && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
              <div style={{ width: 'min(800px, 90vw)', background: '#111', border: '1px solid rgba(3,233,244,0.3)', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h3 style={{ color: '#03e9f4', margin: 0 }}>New Emp</h3>
                  <button className="sort-button" onClick={() => setShowNewEmp(false)}>Close</button>
                </div>
                <form onSubmit={handleAddNewEmp}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input name="name" value={newEmployee.name} onChange={handleNewEmpChange} placeholder="Name" required className="filter-select" />
                    <input name="position" value={newEmployee.position} onChange={handleNewEmpChange} placeholder="Position" required className="filter-select" />
                    <input name="department" value={newEmployee.department} onChange={handleNewEmpChange} placeholder="Department" required className="filter-select" />
                    <input name="email" value={newEmployee.email} onChange={handleNewEmpChange} placeholder="Email" type="email" required className="filter-select" />
                    <input name="phone" value={newEmployee.phone} onChange={handleNewEmpChange} placeholder="Phone" required className="filter-select" />
                    <select name="status" value={newEmployee.status} onChange={handleNewEmpChange} className="filter-select">
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Remote">Remote</option>
                    </select>
                    <input name="joinDate" value={newEmployee.joinDate} onChange={handleNewEmpChange} placeholder="Join Date (YYYY-MM-DD)" type="date" required className="filter-select" />
                    <input name="image" value={newEmployee.image} onChange={handleNewEmpChange} placeholder="Image URL (optional)" className="filter-select" />
                    <input name="skills" value={newEmployee.skills} onChange={handleNewEmpChange} placeholder="Skills (comma separated)" className="filter-select" />
                    <input name="projects" value={newEmployee.projects} onChange={handleNewEmpChange} placeholder="Projects (comma separated)" className="filter-select" />
                    <input name="rating" value={newEmployee.rating} onChange={handleNewEmpChange} placeholder="Rating (0-5)" type="number" step="0.1" min="0" max="5" className="filter-select" />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                    <button type="submit" className="view-profile-btn">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="results-summary">
        Showing {indexOfFirstEmployee + 1} to {Math.min(indexOfLastEmployee, filteredEmployees.length)} of {filteredEmployees.length} employees
      </div>

      <div className="employee-grid">
        {currentEmployees.map(employee => (
          <div className="employee-card" key={employee.id}>
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
              {isAdmin && (
                <button
                  className="view-profile-btn"
                  style={{ marginLeft: '8px', backgroundColor: '#8b0000' }}
                  onClick={() => {
                    if (confirm(`Delete ${employee.name}?`)) {
                      setEmployees(prev => {
                        const updated = prev.filter(e => e.id !== employee.id);
                        try { localStorage.setItem('employees', JSON.stringify(updated)); } catch {}
                        return updated;
                      });
                    }
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={Math.ceil(filteredEmployees.length / employeesPerPage)}
        onPageChange={paginate}
      />
      </div>
    </div>
  </div>
  );
};

export default EmployeeDirectory;