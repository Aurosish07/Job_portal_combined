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
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState('');
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one letter and one number.');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMismatchError('Passwords do not match');
      return;
    }

    const name = `${firstname} ${lastname}`;
    const userData = { name, email, password, role };

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
    <div className="registerDiv_container">
      <div className="registerDiv">
        <div className="registerDiv_image">
          <img src={loginSVG} alt="Register" />
        </div>
        <div className="registerForm">
          <form onSubmit={handleRegister}>
            <h2 className='text'>Register</h2>
            <br/>
            <div className="form-group name-block">
              <div className="form-group-half">
                <label className="form-label" htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  className="form-control"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div className="form-group-half">
                <label className="form-label" htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  className="form-control"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(validatePassword(e.target.value) ? '' : 'Password must be at least 8 characters long and contain at least one letter and one number.');
                }}
                required
              />
              {passwordError && <small className="text-danger">{passwordError}</small>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {passwordMismatchError && <small className="text-danger">{passwordMismatchError}</small>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="role">Role</label>
              <select
                id="role"
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="employer">Employer</option>
                <option value="user">Employee</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
            <button type="button" className="btn btn-login" onClick={() => navigate('/login')}>
              Already have an account? Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;