import React from 'react';
import Footer from '../Footer/Footer';
import './Layout.css';

const Layout = ({ children, showFooter = true }) => {
  return (
    <div className="layout-container">
      <main className="main-content">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;