import React, { useState , useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import loginSVG from '../../Image/SVG/login.png';
import './Register.css';
import '../Login/Login.css';
import baseUrl from '../../configBaseUrl';
import { AuthContext } from '../../context/AuthContext';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const userData = {
      email,
      password,
      role,
    };

    try {

      const response = await fetch(`${baseUrl.mainUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include', // Ensure cookies are sent
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.user);
        console.log('Registration successful!');
        login(result.user.role)
        if (result.user.role === "employer") {

          navigate('/admin');

        } else {

          navigate('/main');
          
        }

      } else {
        const errorData = await response.json();
        console.log(`Error: ${errorData.message}`);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <>
      <div className='loginDiv_container border p-5 d-flex justify-content-center'>
        <div className='loginDiv rounded d-flex bg-white align-items-center'>
          <div className='w-50 py-4'>
            <img src={loginSVG} alt='loginSVG' width='100%' />
          </div>
          <div className='loginForm w-50 px-2 py-3 d-flex align-items-center'>
            <div>
              <small>Hi,</small>
              <h3>Create an account!</h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3 d-flex justify-content-between">
                  <div className='d-flex flex-column'>
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

                  <div className='d-flex flex-column'>
                    <label htmlFor="cpassword" className="form-label">
                      Confirm Password<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="cpassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Register As<span style={{ color: 'red' }}>*</span>
                  </label>
                  <select
                    id="role"
                    className="form-control"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select your role</option>
                    <option value="employer">Employer</option>
                    <option value="user">Employee</option>
                  </select>
                </div>

                <button type="submit" className="btn">Register</button>
                <button type="button" className="btn btn-register mt-3 bg-white border text-black">
                  Already have an account?&nbsp;<Link to='/login'>Log In</Link>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
