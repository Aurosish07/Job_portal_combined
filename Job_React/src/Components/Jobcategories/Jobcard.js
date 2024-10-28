import React from 'react';
import Singlejobcard from './Singlejobcard';

function Jobcard({ jobs = [] }) {  // Default to an empty array if jobs is undefined
  return (
    <div className='p-2 d-flex justify-content-around flex-wrap gap-3'>
      {jobs.map((job) => (
        <Singlejobcard
          key={job.id}
          id={job.id}
          title={job.title}
          description={job.description}
          requirements={job.requirements}
          location={job.location}
          salary={job.salary}
          company={job.company}
          employerId={job.employerId}
          createdAt={job.createdAt}
          updatedAt={job.updatedAt}
        />
      ))}
    </div>
  );
}

export default Jobcard;
