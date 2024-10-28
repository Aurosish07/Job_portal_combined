import React from 'react';
import { Link } from 'react-router-dom';
import './SearchBar.css';

function SearchBar() {
  return (
    <>
      <div className='d-flex flex-column align-items-center'>
        <div className='searchBar_container py-1'>
          <div>
            <h1 className='text-center'>Find Your Dream Job</h1>
          </div>
          {/* search boxes */}
          <form className='d-flex align-items-center justify-content-between mt-4'>
            <div>
              <input type="text" class="form-control" id="keywords" placeholder='Keywords' />
            </div>
            <div>
              <input type="text" class="form-control" id="location" placeholder='Location' />
            </div>
            <div>
              <input type="text" class="form-control" id="company" placeholder='Company' />
            </div>
            <div>
              <button type="submit" class="btn btn-primary">Search</button>
            </div>
          </form>
          {/* search boxes */}
        </div>

        {/* info for Employers */}
        <div className='mt-5'>
          <h5><Link to='#'>Employers:post a job -</Link> your next hire is there</h5>
        </div>
        {/* info for Employers */}

      </div>
    </>
  )
}

export default SearchBar
