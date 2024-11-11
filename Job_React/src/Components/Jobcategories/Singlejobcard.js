import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Star } from 'lucide-react';
import './Singlejobcard.css';

function Singlejobcard({ 
  id, 
  title, 
  description, 
  requirements, 
  location, 
  salary, 
  company, 
  createdAt,
  variant = 'default' 
}) {
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
      day: 86400,
      hour: 3600,
      minute: 60
    };
    
    if (seconds < intervals.hour) {
      const minutes = Math.floor(seconds / intervals.minute);
      return `${minutes}m ago`;
    } else if (seconds < intervals.day) {
      const hours = Math.floor(seconds / intervals.hour);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(seconds / intervals.day);
      return `${days}d ago`;
    }
  };

  if (variant === 'compact') {
    return (
      <div className="job-card-compact">
        <div className="job-card-header">
          <div className="company-logo">
            {company.charAt(0)}
          </div>
          <span className="posted-time">{timeAgo(createdAt)}</span>
        </div>
        <h3 className="job-title">{title}</h3>
        <p className="company-name">
          <Building2 size={14} />
          {company}
          {/* <span className="rating">
            <Star size={12} fill="#FFD700" />
            4.2
          </span> */}
        </p>
        <p className="location">
          <MapPin size={14} />
          {location}
        </p>
        <Link 
          to={`/jobdescription/${id}`}
          state={{ id, title, description, requirements, location, salary, company }}
          className="view-job-link"
        >
          View Job
        </Link>
      </div>
    );
  }

  return (
    <div className="job-card">
      <div className="job-card-content">
        <h2 className="job-title">{title}</h2>
        <p className="company-name">
          <Building2 size={16} />
          {company}
        </p>
        <p className="location">
          <MapPin size={16} />
          {location}
        </p>
        <div className="job-requirements">
          {requirements.split(',').slice(0, 3).map((req, index) => (
            <span key={index} className="requirement-tag">{req.trim()}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Singlejobcard;