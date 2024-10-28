import React from 'react';
import { Link } from 'react-router-dom';
import './Singlejobcard.css';

function Singlejobcard({ id, title, description, requirements, location, salary, company }) {
  return (
    <>
      <div className="job-card">
        <div className="job-header">
          <h2 className="job-title">{title}</h2>
          <p className="company-name">{company}</p>
        </div>
        <div className="job-details">
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Salary:</strong> {salary}</p>
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Requirements:</strong> {requirements}</p>
        </div>
        <div className="job-footer">
          <Link to={`/jobdescription/${id}`} state={{ id, title, description, requirements, location, salary, company }}>
            <button className="apply-btn">Apply Now</button>
          </Link>

        </div>
      </div>
    </>
  );
}

export default Singlejobcard;
