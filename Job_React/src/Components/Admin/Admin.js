import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SideNavbar from './SideNavbar/SideNavbar';
import DashboardContent from './DashboardContent/DashboardContent';
import JobApplicants from './JobApplication/viewApplication';

function Admin() {
  const location = useLocation();

  // Check if the current path is either '/admin/jobpost' or '/admin/joblist'
  const showDashboard = !location.pathname.startsWith('/admin/jobpost') && !location.pathname.startsWith('/admin/joblist') && !location.pathname.startsWith('/admin/joblist/applications');

  return (
    <div className='d-flex'>
      <SideNavbar />
      {showDashboard ? <DashboardContent /> : <Outlet />}
    </div>
  );
}

export default Admin;