import React, { useEffect, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import baseUrl from '../../../configBaseUrl';

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
        navigate(`applications/${jobId}`);
    };

    return (
        <>
            <div id="layoutSidenav_content">
                <main>
                    <div className="py-2 bg-white ps-4">
                        <span><Link to="/">Home</Link></span>
                        <span className="px-2">&#47;</span>
                        <span>All Jobs</span>
                    </div>
                    <div className="container-fluid px-4 py-2">
                        <div className="row">
                            <div className="col-xl-12 col-md-12">
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <i className="fas fa-briefcase me-1"></i>
                                        Job Listings
                                    </div>
                                    <div className="card-body">
                                        {error ? (
                                            <p className="text-danger">{error}</p>
                                        ) : (
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
                                                                        onClick={()=> handleJobClick(job.id)}
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
                                        )}
                                        {/* <div className='text-center'>
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination">
                                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                                </ul>
                                            </nav>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
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
    );
}

export default AllJobs;