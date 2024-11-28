import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Layout from './Layout';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import JobDescription from './Components/JobDescription/JobDescription';
import Admin from './Components/Admin/Admin';
import Jobcategories from './Components/Jobcategories/Jobcategories.js';
import JobAuthcategories from './Components/Jobcategories/JobAuthcategories.js';
import JobPost from './Components/Admin/JobPost/JobPost.js';
import AllJobs from './Components/Admin/JobListing/JobListing.js';
import JobApplicants from './Components/Admin/JobApplication/viewApplication.js';
import AuthProvider from './context/AuthContext.js'; // Make sure it's correctly imported as a named export
import ProfilePage from './Components/profile/profile.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<JobAuthcategories />}></Route>
        <Route path='/main' element={<JobAuthcategories />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/jobdescription/:id' element={<JobDescription />}></Route>
        <Route path='/admin' element={<Admin />}>
          <Route path='jobpost' element={<JobPost />} />
          <Route path='joblist' element={<AllJobs />} />
          <Route path='joblist/applications/:jobId' element={<JobApplicants />} />
        </Route>
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider> {/* Wrap the entire app in AuthProvider here */}
    <RouterProvider router={router} />
  </AuthProvider>
);

reportWebVitals();
