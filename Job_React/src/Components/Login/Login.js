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

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch(`${baseUrl.mainUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });

      if (response.ok) {

        const result = await response.json();
        console.log(result);
        login(result.user.role);

        if (result.user.role === "employer") {
          navigate("/admin");
        } else {
          navigate('/main');
        }

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
    <div className='loginDiv_container border p-5 d-flex justify-content-center'>
      <div className='loginDiv rounded d-flex bg-white align-items-center'>
        <div className='w-50 py-4'>
          <img src={loginSVG} alt='loginSVG' width='100%' />
        </div>
        <div className='loginForm w-50 px-2 py-3 d-flex align-items-center'>
          <div>
            <small>Hi,</small>
            <h3>Welcome Back!</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn">Login</button>
              <button type="button" className="btn btn-register mt-3 bg-white border text-black">
                Don't have an account? <Link to='/register'>Sign Up</Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;