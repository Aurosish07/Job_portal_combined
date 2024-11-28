import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../Image/logo/png/Geinca-main-logo-120x16.png';
import './Header.css';
import baseUrl from '../../configBaseUrl';
import { AuthContext } from '../../context/AuthContext';
import { ChevronDown, User, Settings, LogOut } from "lucide-react";

const UserMenu = ({ userName, email, role, onLogout }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '100%',
      right: 0,
      width: '250px',
      backgroundColor: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '16px',
      zIndex: 1000,
    }}>
      <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '12px', marginBottom: '12px' }}>
        <p style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>{userName}</p>
        <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>{email}</p>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={{ marginBottom: '8px' }}>

          {role === "employer" ? <Link to="/admin" style={{ display: 'flex', alignItems: 'center', color: '#374151', textDecoration: 'none', padding: '8px', borderRadius: '4px', transition: 'background-color 0.2s' }}>
            <User size={18} style={{ marginRight: '8px' }} />
            Admin Panel
          </Link>
            :
            <Link to="/profile" style={{ display: 'flex', alignItems: 'center', color: '#374151', textDecoration: 'none', padding: '8px', borderRadius: '4px', transition: 'background-color 0.2s' }}>
              <User size={18} style={{ marginRight: '8px' }} />
              View Profile
            </Link>}

        </li>
        <li style={{ marginBottom: '8px' }}>
          {role !== 'employer' && <Link to="/account" style={{ display: 'flex', alignItems: 'center', color: '#374151', textDecoration: 'none', padding: '8px', borderRadius: '4px', transition: 'background-color 0.2s' }}>
            <Settings size={18} style={{ marginRight: '8px' }} />
            Manage Account
          </Link>}

        </li>
        <li>
          <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', color: '#ef4444', background: 'none', border: 'none', width: '100%', textAlign: 'left', padding: '8px', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.2s' }}>
            <LogOut size={18} style={{ marginRight: '8px' }} />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

function Header() {
  const { login, logout, isLoggedIn, role } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

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
        console.log(data);
        if (data.isLoggedin) {
          login(data.role);
          setUserName(data.name);
          setEmail(data.email); // Assuming the API returns an email field
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    fetchStatus();
  }, [login]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${baseUrl.mainUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log("log out successful")
        logout();
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/');
        }, 3000);
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const firstName = userName.split(' ')[0];

  return (
    <header className='sticky-top'>
      <div className='container-fluid py-2 d-flex align-items-center justify-content-between'>
        <div>
          <Link className="navbar-brand" to="/">
            <img src={logo} alt='logo' width='120' height='18' />
          </Link>
        </div>

        <div className='d-flex profile' style={{ position: 'relative' }}>
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
              <span className="welcome-message px-2 py-1">Welcome,</span>
              <li
                className="nav-item login_btn px-2 py-1"
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}
              >
                <NavLink className="nav-link text-white">
                  {firstName}
                  <ChevronDown style={{ color: 'white', cursor: 'pointer', marginLeft: '4px' }} />
                </NavLink>
                {showMenu && <UserMenu userName={userName} email={email} role={role} onLogout={handleLogout} />}
              </li>
            </>
          )}
        </div>
      </div>
      {showPopup && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
        }}>
          Logged out successfully!
        </div>
      )}
    </header>
  );
}

export default Header;