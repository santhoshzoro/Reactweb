import { BrowserRouter, Routes, Route } from 'react-router-dom';
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





function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page without footer */}
        <Route path="/" element={<Login />} />
        
        {/* All other pages with footer */}
        <Route path="/lightrays" element={<Layout><LightRays /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/dashboardInner" element={<Layout><DashboardInner /></Layout>} />
        <Route path="/employeeDirectory" element={<Layout><EmployeeDirectory /></Layout>} />
        <Route path="/employeeProfile/:id" element={<Layout><EmployeeProfileWrapper /></Layout>} />
        <Route path="/ActiveProjects" element={<Layout><ActiveProjects /></Layout>} />
        <Route path="/PerformanceDashboard" element={<Layout><PerformanceDashboard /></Layout>} />
        <Route path="/DepartmentGrowthDashboard" element={<Layout><DepartmentGrowthDashboard /></Layout>} />
        <Route path="/wiki" element={<Layout><Wiki /></Layout>} />
        
        
        
        {/* Fallback route for unmatched paths */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;