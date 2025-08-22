import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import employeeData from './employeeData.js';
import './EmployeeDirectory.css';
import './EmployeeCard.css';
import SearchBar from './SearchBar';
import PaginationComponent from './PaginationComponent';


const EmployeeDirectory = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEmployees, setFilteredEmployees] = useState(employeeData);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const employeesPerPage = 9; // Changed from 10 to 9 (3x3 grid)

  useEffect(() => {
    let filtered = employeeData;
    
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
  }, [searchTerm, departmentFilter, statusFilter, sortBy, sortOrder]);

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
  const departments = ['All', ...new Set(employeeData.map(employee => employee.department))];

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

  return (
    <div  className="employee-directory-page">
    <div className="employee-directory">
      <div className="directory-header">
        <h1>Employee Directory</h1>
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