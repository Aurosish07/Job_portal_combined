import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Jobcard from './Jobcard';
import baseUrl from '../../configBaseUrl';

function JobAuthcategories() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationDetected, setLocationDetected] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [searchParams, setSearchParams] = useState({
    title: '',
    location: '',
    page: 1,
    limit: 8, // Default to 8 jobs per page
  });

  const fetchJobs = async () => {
    setLoading(true);
    const { title, location, page, limit } = searchParams;

    try {
      // Create a query object only if title or location is provided, otherwise, omit them
      const queryParams = {
        page: page.toString(),
        limit: limit.toString(),
      };

      if (title) queryParams.title = title;
      if (location) queryParams.location = location;

      // Construct query string
      const query = new URLSearchParams(queryParams).toString();

      // Fetch jobs from API
      const response = await fetch(`${baseUrl.mainUrl}/api/auth/search?${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        setJobs(result.jobs);
        setPagination({
          currentPage: parseInt(result.currentPage, 10),
          totalPages: parseInt(result.totalPages, 10),
        });
        console.log(result);
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
      }
    } catch (err) {
      setError('An error occurred while fetching jobs.');
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setSearchParams((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  const handlePreviousPage = () => {
    if (pagination.currentPage > 1) {
      setSearchParams((prev) => ({
        ...prev,
        page: prev.page - 1,
      }));
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const detectedLocation = `${latitude},${longitude}`;

          setSearchParams((prev) => ({
            ...prev,
            location: detectedLocation,
          }));

          setLocationDetected(true);
        },
        (error) => {
          console.error('Error detecting location:', error);
          setError('Could not detect location. Showing all jobs.');
          setLocationDetected(true);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLocationDetected(true);
    }
  };

  // Detect location when component mounts
  useEffect(() => {
    detectLocation();
  }, []);

  // Fetch jobs whenever locationDetected or searchParams change
  useEffect(() => {
    if (locationDetected) {
      fetchJobs();
    }
  }, [locationDetected, searchParams]);

  return (
    <div className='border' style={{ background: '#ECF0F1' }}>
      <div>
        <div className='searchBar_component_container d-flex align-items-center justify-content-center mx-auto my-3 py-3 rounded-2'>
          <SearchBar setSearchParams={setSearchParams} />
        </div>
        <div className='jobs_component_container'>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <div className='jobs_cards_container'>
            {jobs.length > 0 ? (
              <>
                <Jobcard jobs={jobs} />
                <div className="pagination-controls d-flex justify-content-center my-3">
                  <button onClick={handlePreviousPage} disabled={pagination.currentPage === 1}>
                    Previous
                  </button>
                  <p>{pagination.currentPage} of {pagination.totalPages}</p>
                  <button onClick={handleNextPage} disabled={pagination.currentPage === pagination.totalPages}>
                    Next
                  </button>
                </div>
              </>
            ) : (
              <p>No jobs found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobAuthcategories;