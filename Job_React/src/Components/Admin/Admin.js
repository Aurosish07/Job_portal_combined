import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SideNavbar from './SideNavbar/SideNavbar';
import DashboardContent from './DashboardContent/DashboardContent';
import './Admin.css';

function Admin() {
  const location = useLocation();

  const showDashboard = !location.pathname.startsWith('/admin/jobpost') && 
                        !location.pathname.startsWith('/admin/joblist') && 
                        !location.pathname.startsWith('/admin/joblist/applications');

  return (
    <div className="admin-layout">
      <SideNavbar />
      <main className="admin-main-content">
        {showDashboard ? <DashboardContent /> : <Outlet />}
      </main>
    </div>
  );
}

export default Admin;