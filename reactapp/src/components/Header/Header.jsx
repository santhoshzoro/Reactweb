import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';

// Floating profile button in the top-right that doesn't disturb page layout
// Reads user info from localStorage key 'auth' (set in login.jsx)
// Logout clears localStorage and redirects to '/'
const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ email: '', role: '' });
  const menuRef = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth');
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser({ email: parsed.email || '', role: parsed.role || '' });
      }
    } catch {}
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLogout() {
    try { localStorage.removeItem('auth'); } catch {}
    navigate('/');
  }

  const initials = user.email ? user.email.charAt(0).toUpperCase() : 'U';

  return (
    <div className="profile-root" ref={menuRef}>
      <button className="profile-btn" onClick={() => setOpen(v => !v)} aria-label="User menu">
        <span className="avatar" aria-hidden>{initials}</span>
      </button>

      {open && (
        <div className="dropdown" role="menu">
          <div className="dropdown-header">
            <div className="avatar sm">{initials}</div>
            <div>
              <div className="dropdown-email" title={user.email}>{user.email || 'Guest'}</div>
              {user.role && <div className="dropdown-role">{user.role}</div>}
            </div>
          </div>
          <div className="dropdown-sep" />
          <Link className="dropdown-item" to="/dashboard" onClick={() => setOpen(false)}>Home</Link>
          <Link className="dropdown-item" to="/employeeDirectory" onClick={() => setOpen(false)}>Employees</Link>
          <Link className="dropdown-item" to="/wiki" onClick={() => setOpen(false)}>Wiki</Link>
          <div className="dropdown-sep" />
          <button className="dropdown-item danger" onClick={handleLogout}>Log out</button>
        </div>
      )}
    </div>
  );
};

export default Header;