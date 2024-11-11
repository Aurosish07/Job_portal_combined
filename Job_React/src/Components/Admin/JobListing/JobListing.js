import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import baseUrl from '../../../configBaseUrl';

function AllJobs() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
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

                const jobsData = await jobsResponse.json();
                const applicationsData = await applicationsResponse.json();

                if (!jobsResponse.ok) throw new Error("Error fetching jobs");
                if (!applicationsResponse.ok) throw new Error("Error fetching applications");

                const jobsWithApplicants = jobsData.map(job => ({
                    ...job,
                    numberOfApplicants: applicationsData.filter(app => app.jobId === job.id).length
                }));

                setJobs(jobsWithApplicants);
            } catch (error) {
                setError('Error fetching data: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobsAndApplicants();
    }, []);

    const handleJobClick = (jobId) => {
        navigate(`applications/${jobId}`);
    };

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>All Jobs</h1>
                <nav>
                    <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>Home</Link>
                    <span style={{ margin: '0 8px' }}>/</span>
                    <span>All Jobs</span>
                </nav>
            </div>

            {error ? (
                <p style={{ color: '#ef4444', textAlign: 'center', padding: '20px' }}>{error}</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f3f4f6' }}>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Id</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Job Title</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Location</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Salary</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>No. of Applicants</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.length > 0 ? (
                                jobs.map((job) => (
                                    <tr key={job.id}>
                                        <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{job.id}</td>
                                        <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{job.title}</td>
                                        <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{job.location}</td>
                                        <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{job.salary}</td>
                                        <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{job.numberOfApplicants || 0}</td>
                                        <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                                            <button
                                                onClick={() => handleJobClick(job.id)}
                                                style={{
                                                    backgroundColor: '#35B6FF',
                                                    color: '#fff',
                                                    border: 'none',
                                                    padding: '8px 16px',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                View Applications
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                                        No jobs found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <footer style={{ marginTop: '40px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
                <p>&copy; 2024 EINCA. All rights reserved.</p>
                <div style={{ marginTop: '8px' }}>
                    <Link to="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Privacy Policy</Link>
                    <span style={{ margin: '0 8px' }}>•</span>
                    <Link to="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Terms &amp; Conditions</Link>
                </div>
            </footer>
        </div>
    );
}

export default AllJobs;