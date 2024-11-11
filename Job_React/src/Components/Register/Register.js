import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import loginSVG from '../../Image/SVG/login.png';
import './Register.css';
import baseUrl from '../../configBaseUrl';
import { AuthContext } from '../../context/AuthContext';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState('');
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one letter and one number.');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMismatchError('Passwords do not match');
      return;
    }

    const userData = { email, password, role };

    try {
      const response = await fetch(`${baseUrl.mainUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Registration successful!');
        login(result.user.role);
        navigate(result.user.role === "employer" ? '/admin' : '/main');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className='registerDiv_container'>
      <div className='registerDiv'>
        <div className='registerDiv_image'>
          <img src={loginSVG} alt='Registration illustration' />
        </div>
        <div className='registerForm'>
          <small>Welcome!</small>
          <h2>Create an account</h2>

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
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(validatePassword(e.target.value) ? '' : 'Password must be at least 8 characters long and contain at least one letter and one number.');
                }}
                required
                aria-required="true"
              />
              {passwordError && <small className="text-danger">{passwordError}</small>}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                aria-required="true"
              />
              {passwordMismatchError && <small className="text-danger">{passwordMismatchError}</small>}
            </div>

            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Register As
              </label>
              <select
                id="role"
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                aria-required="true"
              >
                <option value="" disabled>Select your role</option>
                <option value="employer">Employer</option>
                <option value="user">Employee</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">Register</button>
          </form>

          <Link to='/login' className="btn btn-login">
            Already have an account? Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;