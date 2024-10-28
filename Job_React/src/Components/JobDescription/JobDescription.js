import React from 'react';
import { useLocation } from 'react-router-dom';
import './JobDescription.css';
import baseUrl from '../../configBaseUrl';
import { Link, useNavigate } from 'react-router-dom';


function JobDescription() {
  const location = useLocation();
  const { id, title, description, requirements, location: jobLocation, salary, company } = location.state;
  const navigate = useNavigate();

  // Function to handle job application
  const handleApply = async () => {
    try {
      const response = await fetch(`${baseUrl.mainUrl}/api/auth/jobs/${id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const result = await response.json(); // Parse the JSON response

      if (response.ok) {
        // Handle success
        alert(result.message); // Display success message from the back-end
        console.log(result);
        navigate('/main');
      } else {
        // Handle error
        alert(`Error: ${result.message}`); // Display error message from the back-end
        console.log(result);
      }
    } catch (error) {
      console.error('Error applying for the job:', error);
      alert('An error occurred while applying for the job. Please try again.');
    }
  };


  return (
    <div>
      <main>
        <section className="job-description">
          <h2>{title}</h2>
          <p>{company}</p>
          <p><strong>Location:</strong> {jobLocation}</p>
          <p><strong>Salary:</strong> {salary}</p>
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Requirements:</strong> {requirements}</p>
          <button className="apply-btn" onClick={handleApply}>Apply Now</button>
        </section>
      </main>
    </div>
  );
}

export default JobDescription;
