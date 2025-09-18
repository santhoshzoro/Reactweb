import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import LightRays from '../lightrayslogin/LightRays/LightRays';
import Dashboard from './dashboard';
import DashboardInner from './dashboardinner';
import EmployeeDirectory from './employeeDirectorypage/EmployeeDirectory';
import EmployeeProfileWrapper from './employeeDirectorypage/EmployeeProfileWrapper';
import Layout from './components/Layout/Layout';
import ActiveProjects from './ActiveProjects';
import PerformanceDashboard from './PerformanceDashboard';
import DepartmentGrowthDashboard from './DepartmentGrowthDashboard';
import Wiki from './Wiki';
import About from './About';

function App() {
  // Use Vite's BASE_URL so dev is '/', prod is '/Reactweb/' - strip trailing slash
  const basename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

  return (
    <HashRouter basename={basename}>
      <Routes>
        {/* Login page (also used for signup redirect) */}
        <Route path="/" element={<Login />} />
        
        {/* Content pages wrapped with layout */}
        <Route path="/lightrays" element={<Layout><LightRays /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/dashboardInner" element={<Layout><DashboardInner /></Layout>} />
        <Route path="/employeeDirectory" element={<Layout><EmployeeDirectory /></Layout>} />
        <Route path="/employeeProfile/:id" element={<Layout><EmployeeProfileWrapper /></Layout>} />
        <Route path="/ActiveProjects" element={<Layout><ActiveProjects /></Layout>} />
        <Route path="/PerformanceDashboard" element={<Layout><PerformanceDashboard /></Layout>} />
        <Route path="/DepartmentGrowthDashboard" element={<Layout><DepartmentGrowthDashboard /></Layout>} />
        <Route path="/wiki" element={<Layout><Wiki /></Layout>} />
        <Route path="/about" element={<Layout><About/></Layout>} />

        {/* Signup should go to login page */}
        <Route path="/signup" element={<Navigate to="/" replace />} />

        {/* Fallback: redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;