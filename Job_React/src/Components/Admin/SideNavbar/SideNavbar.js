import React from 'react';
import './SideNavbar.css';
import bagicon from '../../../Image/briefcase.png';
import { Link, NavLink } from 'react-router-dom';

function SideNavbar() {
  return (
    <>
      <div id="layoutSidenav" className='d-flex'>
        <div id="layoutSidenav_nav">
          <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <li className="nav-item">
              <Link className="nav-link d-flex layoutSidenav_nav_heading rounded" to='/admin'>
                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                Dashboard
              </Link>
            </li>
            <div className="sb-sidenav-menu">
              <div className="nav d-flex flex-column">
                <div className="sb-sidenav-menu-heading">Theme</div>

                <li class="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fa-solid fa-briefcase"></i>
                    <span style={{ marginLeft: '10px' }}>Jobs</span>
                  </NavLink>

                  <ul class="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item" to="joblist">
                        <i className="fas fa-tachometer-alt"></i>
                        <span style={{ marginLeft: '10px' }}>All Jobs</span></NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item mt-2" to="jobpost">
                        <i className="fas fa-tachometer-alt"></i>
                        <span style={{ marginLeft: '10px' }}>Post a Job</span></NavLink>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link className="nav-link d-flex" to='#'>
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Typography
                  </Link>
                </li>

                <div className="sb-sidenav-menu-heading">Components</div>
                <li className="nav-item">
                  <Link className="nav-link d-flex" to="#">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                    Base
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link d-flex" to="#">
                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                    Pages
                  </Link>
                </li>

                <div className="sb-sidenav-menu-heading">Addons</div>

                <li className="nav-item">
                  <Link className="nav-link d-flex" to="charts.html">
                    <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                    Charts
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link d-flex" to="tables.html">
                    <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                    Tables
                  </Link>
                </li>

              </div>
            </div>
            <div className="sb-sidenav-footer">

            </div>
          </nav>
          </div>
        </div>
      </>
      )
}

export default SideNavbar;
