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
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      title,
      description,
      requirements,
      location,
      salary,
      company
    };

    try {
      const response = await fetch(`${baseUrl.mainUrl}/api/role/employer/job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
        credentials: 'include',
      });

      const result = await response.json();
      if (response.status === 200) {
        console.log(result);
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

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold'
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Create a Job Post</h1>
        <nav>
          <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span>Job Post</span>
        </nav>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: '2' }}>
          <form onSubmit={handleSubmit}>
            {error && <p style={{ color: '#ef4444', marginBottom: '16px' }}>{error}</p>}
            
            <div>
              <label htmlFor="jobTitle" style={labelStyle}>Job Title</label>
              <input
                type="text"
                id="jobTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="jobDescription" style={labelStyle}>Job Description</label>
              <textarea
                id="jobDescription"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={inputStyle}
              ></textarea>
            </div>

            <div>
              <label htmlFor="jobRequirements" style={labelStyle}>Requirements</label>
              <textarea
                id="jobRequirements"
                rows="3"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                style={inputStyle}
              ></textarea>
            </div>

            <div>
              <label htmlFor="jobLocation" style={labelStyle}>Location</label>
              <input
                type="text"
                id="jobLocation"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="jobSalary" style={labelStyle}>Salary</label>
              <input
                type="text"
                id="jobSalary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="jobCompany" style={labelStyle}>Company</label>
              <input
                type="text"
                id="jobCompany"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={inputStyle}
              />
            </div>

            <button 
              type="submit" 
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Post Job
            </button>
          </form>
        </div>

        <div style={{ flex: '1' }}>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Additional Information</h2>
            <p>Include any charts or stats here.</p>
          </div>
        </div>
      </div>

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

export default JobPost;