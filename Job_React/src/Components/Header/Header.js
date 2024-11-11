import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../Image/logo/png/Geinca-main-logo-120x16.png';
import './Header.css';
import baseUrl from '../../configBaseUrl';
import { AuthContext } from '../../context/AuthContext';

function Header() {

  const { login, isLoggedIn, role } = useContext(AuthContext);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`${baseUrl.mainUrl}/api/auth/cheak-status`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to check login status');
        }

        const data = await response.json();
        if (data.isLoggedin) {
          login(data.role); // Update state with the user role from the response
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    fetchStatus();  // Check if the user is logged in when the header loads
  }, [login]);

  return (
    <header className='sticky-top'>
      <div className='container-fluid py-2 d-flex align-items-center justify-content-between'>
        <div>
          <Link className="navbar-brand" to="#">
            <img src={logo} alt='logo' width='120' height='18'/>
          </Link>
        </div>

        <div className='d-flex profile'>
          {!isLoggedIn ? (
            <>
              <li className="nav-item login_btn px-2 py-1">
                <NavLink className="nav-link text-white" to="/login">Login</NavLink>
              </li>
              <li className="nav-item login_btn px-2 py-1">
                <NavLink className="nav-link text-white" to="/register">Register</NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item login_btn px-2 py-1">
                <NavLink className="nav-link text-white" to="/profile">Profile</NavLink>
              </li>
              {role === 'employer' && (
                <li className="nav-item login_btn px-2 py-1">
                  <NavLink className="nav-link text-white" to="/admin">Admin</NavLink>
                </li>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
