import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import baseUrl from '../../../configBaseUrl';
import './DashboardContent.css';

function StatCard({ title, value, icon, color }) {
  return (
    <div className="stat-card" style={{ borderColor: color }}>
      <div className="stat-card-content">
        <h3>{title}</h3>
        <p className="stat-value" style={{ color }}>{value}</p>
      </div>
      <div className="stat-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
    </div>
  );
}

function AllJobs({ jobs, onViewApplications }) {
  return (
    <div className="all-jobs-section">
      <h2>All Jobs</h2>
      <div className="jobs-header">
        <input type="text" placeholder="Search jobs..." className="search-input" />
        <button className="post-job-btn">Post New Job</button>
      </div>
      <table className="jobs-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Applicants</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.location}</td>
              <td>{job.salary}</td>
              <td>{job.numberOfApplicants || 0}</td>
              <td>
                <button className="view-applications-btn" onClick={() => onViewApplications(job.id)}>
                  View Applications
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DashboardContent() {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    pendingJobs: 0,
    closedJobs: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobsAndApplicants = async () => {
      try {
        const [jobsResponse, applicationsResponse] = await Promise.all([
          fetch(`${baseUrl.mainUrl}/api/role/employer/jobs`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          }),
          fetch(`${baseUrl.mainUrl}/api/role/employer/jobs/applications`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          })
        ]);

        if (!jobsResponse.ok || !applicationsResponse.ok) {
          throw new Error("Error fetching data");
        }

        const [jobsData, applicationsData] = await Promise.all([
          jobsResponse.json(),
          applicationsResponse.json()
        ]);

        const jobsWithApplicants = jobsData.map(job => ({
          ...job,
          numberOfApplicants: applicationsData.filter(app => app.jobId === job.id).length
        }));

        setJobs(jobsWithApplicants);
        setApplicants(applicationsData);

        setDashboardStats({
          totalJobs: jobsData.length,
          activeJobs: jobsData.filter(job => job.status !== 'closed').length,
          pendingJobs: jobsData.filter(job => job.status === 'pending').length,
          closedJobs: jobsData.filter(job => job.status === 'closed').length,
        });

      } catch (error) {
        setError('Error fetching data: ' + error.message);
        console.error('Error fetching data:', error);
      }
    };

    fetchJobsAndApplicants();
  }, []);

  const handleViewApplications = (jobId) => {
    navigate(`joblist/applications/${jobId}`);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="customize-btn">Customize Dashboard</button>
      </div>
      <div className="stats-container">
        <StatCard title="Total Jobs" value={dashboardStats.totalJobs} icon="📊" color="#5856D6" />
        <StatCard title="Active Jobs" value={dashboardStats.activeJobs} icon="🕒" color="#3399FF" />
        <StatCard title="Pending Jobs" value={dashboardStats.pendingJobs} icon="⏳" color="#F9B115" />
        <StatCard title="Closed Jobs" value={dashboardStats.closedJobs} icon="✅" color="#E55353" />
      </div>
      <AllJobs jobs={jobs} onViewApplications={handleViewApplications} />
      <footer className="dashboard-footer">
        <div className="footer-content">
          <p>&copy; 2024 Job Portal. All rights reserved.</p>
          <div>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span> | </span>
            <Link to="/terms-conditions">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DashboardContent;