import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <>
      <footer className='footer_wrapper py-5'>
      
        <div className='footer_links_wrapper d-flex align-items-start justify-content-around py-3'>
          <div>
            <h5>Categories</h5>
            <ul>
              <li>
                <Link to='#'>IOS Developer</Link>
              </li>
              <li>
                <Link to='#'>Front-End Developer</Link>
              </li>
              <li>
                <Link to='#'>UX Developer</Link>
              </li>
              <li>
                <Link to='#'>UI Designers</Link>
              </li>
              <li>
                <Link to='#'>Content Writers</Link>
              </li>
              <li>
                <Link to='#'>Program & Tech</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5>Community</h5>
            <ul>
              <li>
                <Link to='#'>Events</Link>
              </li>
              <li>
                <Link to='#'>Blog</Link>
              </li>
              <li>
                <Link to='#'>Forum</Link>
              </li>
              <li>
                <Link to='#'>Podcast</Link>
              </li>
              <li>
                <Link to='#'>Afiliates</Link>
              </li>
              <li>
                <Link to='#'>Invite a Friend</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5>About</h5>
            <ul>
              <li>
                <Link to='#'>About Us</Link>
              </li>
              <li>
                <Link to='#'>Partnerships</Link>
              </li>
              <li>
                <Link to='#'>Finance Experts</Link>
              </li>
              <li>
                <Link to='#'>Project Management</Link>
              </li>
              <li>
                <Link to='#'>Project Manager</Link>
              </li>
              <li>
                <Link to='#'>The Team</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5>Contact</h5>
            <ul>
              <li>
                <Link to='#'>Contact Us</Link>
              </li>
              <li>
                <Link to='#'>Press Center</Link>
              </li>
              <li>
                <Link to='#'>Careers</Link>
              </li>
              <li>
                <Link to='#'>FAQ</Link>
              </li>
            </ul>
          </div>
          
          
          
        </div>
      </footer>
    </>
  )
}

export default Footer
