import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import baseUrl from '../../../configBaseUrl';
import JobApplicants from '../JobApplication/viewApplication.js';
import { useNavigate } from 'react-router-dom';


function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate(); // Use react-router's navigation hook

  useEffect(() => {
    const fetchJobsAndApplicants = async () => {
      try {
        const jobsResponse = await fetch(`${baseUrl.mainUrl}/api/role/employer/jobs`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const jobsData = await jobsResponse.json();
        if (!jobsResponse.ok) {
          setError("Error fetching jobs");
          return;
        }

        const applicationsResponse = await fetch(`${baseUrl.mainUrl}/api/role/employer/jobs/applications`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const applicationsData = await applicationsResponse.json();
        if (!applicationsResponse.ok) {
          setError("Error fetching applications");
          return;
        }

        const jobsWithApplicants = jobsData.map(job => {
          const applicantCount = applicationsData.filter(app => app.jobId === job.id).length;
          return { ...job, numberOfApplicants: applicantCount };
        });

        setJobs(jobsWithApplicants);
      } catch (error) {
        setError('Error fetching data: ' + error.message);
      }
    };

    fetchJobsAndApplicants();
  }, []);

  const handleJobClick = (jobId) => {
    // Navigate to a new route for the specific job
    navigate(`joblist/applications/${jobId}`);
  };

  return (
    <div className="card-body">
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Job Title</th>
                <th scope="col">Location</th>
                <th scope="col">Salary</th>
                <th scope="col">No. of Applicants</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job.id}>
                    <th scope="row">{job.id}</th>
                    <td>{job.title}</td>
                    <td>{job.location}</td>
                    <td>{job.salary}</td>
                    <td>{job.numberOfApplicants || 0}</td>
                    <td>
                      <button
                        style={{ background: '#35B6FF', color: '#fff' }}
                        className="btn w-75"
                        onClick={() => handleJobClick(job.id)}  // Navigate with jobId
                      >
                        View Applications
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
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

  useEffect(() => {
    const fetchJobsAndApplicants = async () => {
      try {
        // Fetch jobs posted by the employer
        const jobsResponse = await fetch(`${baseUrl.mainUrl}/api/role/employer/jobs`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const jobsData = await jobsResponse.json();
        if (!jobsResponse.ok) {
          setError("Error fetching jobs");
          return;
        }

        // Fetch applicants for the jobs
        const applicationsResponse = await fetch(`${baseUrl.mainUrl}/api/role/employer/jobs/applications`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const applicationsData = await applicationsResponse.json();
        if (!applicationsResponse.ok) {
          setError("Error fetching applications");
          return;
        }

        // Set fetched jobs and applicants to state
        setJobs(jobsData);
        setApplicants(applicationsData);

        console.log(jobsData);

        // Calculate dashboard statistics
        const totalJobs = jobsData.length;
        const closedJobs = jobsData.filter(job => job.status === 'closed').length;
        const activeJobs = totalJobs - closedJobs; // Active jobs are those that are not closed
        const pendingJobs = jobsData.filter(job => job.status === 'pending').length;

        setDashboardStats({
          totalJobs,
          activeJobs,
          pendingJobs,
          closedJobs,
        });

      } catch (error) {
        setError('Error fetching data: ' + error.message);
        console.error('Error fetching data:', error);
      }
    };

    fetchJobsAndApplicants();
  }, []);

  return (
    <>
      <div id="layoutSidenav_content">
        <main>
          <div className='py-2 bg-white ps-4'>
            <span><Link to='/'>Home</Link></span>
            <span className='px-2'>&#47;</span>
            <span>Dashboard</span>
          </div>
          <div className="container-fluid px-4 py-2">
            <div className="row">

              <div className="col-xl-3 col-md-6">
                <div className="card text-white mb-4" style={{ backgroundColor: '#5856D6' }}>
                  <div className="card-body">
                    <h2>{dashboardStats.totalJobs}</h2>
                    <h5>Total Jobs</h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card text-white mb-4" style={{ backgroundColor: '#3399FF' }}>
                  <div className="card-body">
                    <h2>{dashboardStats.activeJobs}</h2>
                    <h5>Active Jobs</h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card text-white mb-4" style={{ backgroundColor: '#F9B115' }}>
                  <div className="card-body">
                    <h2>{dashboardStats.pendingJobs}</h2>
                    <h5>Pending Jobs</h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card text-white mb-4" style={{ backgroundColor: '#E55353' }}>
                  <div className="card-body">
                    <h2>{dashboardStats.closedJobs}</h2>
                    <h5>Closed Jobs</h5>
                  </div>
                </div>
              </div>

            </div>

            <AllJobs jobs={jobs} applicants={applicants} />

          </div>
        </main>

        <footer className="py-4 bg-light mt-auto">
          <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted">Copyright &copy; 2024</div>
              <div>
                <Link to="#">Privacy Policy</Link>
                &middot;
                <Link to="#">Terms &amp; Conditions</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}


export default DashboardContent
