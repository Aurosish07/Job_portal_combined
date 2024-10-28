import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import baseUrl from '../../../configBaseUrl';

function JobPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  
  // useNavigate hook for navigation
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with all the fields
    const jobData = {
      title,
      description,
      requirements,
      location,
      salary,
      company
    };

    try {
      // Make a POST request to the backend API with the job data
      const response = await fetch(`${baseUrl.mainUrl}/api/role/employer/job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
        credentials: 'include', // Include credentials in the request
      });

      const result = await response.json();
      if (response.status === 200) {
        console.log(result);
        // Navigate to the job list page upon successful job creation
        navigate("/admin/joblist");
      } else {
        console.log(result);
        setError(result.error || 'Failed to create job. Please try again.');
      }

    } catch (error) {
      setError('Failed to create job. Please try again.');
      console.error(error);
    }
  };

  return (
    <>
      <div id="layoutSidenav_content">
        <main>
          <div className="py-2 bg-white ps-4">
            <span><Link to="/">Home</Link></span>
            <span className="px-2">&#47;</span>
            <span>Job Post</span>
          </div>
          <div className="container-fluid px-4 py-2">
            <div className="row">
              <div className="col-xl-8 col-md-12">
                <div className="card mb-4">
                  <div className="card-header">
                    <i className="fas fa-plus-circle me-1"></i>
                    Create a Job Post
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      {error && <p className="text-danger">{error}</p>}
                      <div className="mb-3">
                        <label htmlFor="jobTitle" className="form-label">Job Title</label>
                        <input
                          type="text"
                          className="form-control"
                          id="jobTitle"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="jobDescription" className="form-label">Job Description</label>
                        <textarea
                          className="form-control"
                          id="jobDescription"
                          rows="3"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="jobRequirements" className="form-label">Requirements</label>
                        <textarea
                          className="form-control"
                          id="jobRequirements"
                          rows="3"
                          value={requirements}
                          onChange={(e) => setRequirements(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="jobLocation" className="form-label">Location</label>
                        <input
                          type="text"
                          className="form-control"
                          id="jobLocation"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="jobSalary" className="form-label">Salary</label>
                        <input
                          type="text"
                          className="form-control"
                          id="jobSalary"
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="jobCompany" className="form-label">Company</label>
                        <input
                          type="text"
                          className="form-control"
                          id="jobCompany"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">Post Job</button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Placeholder for Charts or Additional Info */}
              <div className="col-xl-4 col-md-6">
                <div className="card mb-4">
                  <div className="card-header">
                    <i className="fas fa-info-circle me-1"></i>
                    Additional Information
                  </div>
                  <div className="card-body">
                    <p>Include any charts or stats here.</p>
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

export default JobPost;