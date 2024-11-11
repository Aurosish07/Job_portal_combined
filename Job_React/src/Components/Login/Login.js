import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginSVG from '../../Image/SVG/login.png';
import './Login.css';
import baseUrl from '../../configBaseUrl';
import { AuthContext } from '../../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = { email, password };

    try {
      const response = await fetch(`${baseUrl.mainUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        login(result.user.role);

        navigate(result.user.role === "employer" ? "/admin" : '/main');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div className='loginDiv_container'>
      <div className='loginDiv d-flex'>
        <div className='loginDiv_image'>
          <img src={loginSVG} alt='Login illustration' />
        </div>
        <div className='loginForm'>
          <small>Welcome back!</small>
          <h2>Log in to your account</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <button type="submit" className="btn btn-primary">Log In</button>
          </form>

          <Link to='/register' className="btn btn-register">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;