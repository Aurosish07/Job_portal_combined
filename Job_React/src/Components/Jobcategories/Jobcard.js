import React from 'react';
import Singlejobcard from './Singlejobcard';
import './Jobcard.css';
import image from '../../Image/logo/png/image.jpeg';
import JobTypes from './jobcategoriesData';

function Jobcard({ jobs = [] }) {
  const companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Nvidia', 'X', 'TCS', 'Apple', 'IBM', 'Oracle'];

  return (
    <div className="jobs-container">
      {/* Jobs in your location section */}
      <section className="jobs-section">
        <div className="section-header">
          <h2>Jobs in your location (7)</h2>
          <a href="#" className="view-all">View all</a>
        </div>
        <div className="scroll-container">
          {jobs.map((job) => (
            <Singlejobcard
              key={job.id}
              {...job}
              variant="compact"
            />
          ))}
        </div>
      </section>

      {/* Top companies section */}
      <section className="jobs-section">
        <div className="section-header">
          <h2>Top Companies</h2>
          <a href="#" className="view-all">View all</a>
        </div>
        <div className="scroll-container">
          {companies.map((company) => (
            <div key={company} className="company-card">
              <div className="company-logo">
                {company.charAt(0)}
              </div>
              <h3>{company}</h3>
              <p>View open positions</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Job Positions section */}
      <section className="jobs-section">
        <div className="section-header">
          <h2>Popular Job Positions</h2>
          <a href="#" className="view-all">View all</a>
        </div>
        <div className="scroll-container popular-positions">
          {jobs.map((job) => (


            <JobTypes
              title={job.title}
              image={image}
            />

          ))}
        </div>
      </section>

      <div className="recommendation-banner">
        <p>Get the best job recommendations by telling us your career needs.</p>
        <a href="#" className="add-now-btn">Add now</a>
      </div>
    </div>
  );
}

export default Jobcard;