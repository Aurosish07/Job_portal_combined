import React from 'react';
import SearchBar from './SearchBar';
import Jobcard from './Jobcard';

function Jobcategories() {
  return (
    <>
      <div className='border' style={{background:'#ECF0F1'}}>
        <div>
          <div className='searchBar_component_conatiner d-flex align-items-center justify-content-center mx-auto my-3 py-3 rounded-2'>
            <SearchBar />
          </div>
          <div className='jobs_component_conatiner'>
            <div className='jobs_cards_container'>
              <Jobcard />
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Jobcategories;
