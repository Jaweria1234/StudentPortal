import React, { useState } from 'react';
import './Navbar.css'; // For external styling if needed
import { Link } from 'react-router-dom'; // Assuming you are using react-router for navigation
import { MDBBtn } from 'mdb-react-ui-kit';

const Navbar = () => {
  const [isResponsive, setIsResponsive] = useState(false);

  const toggleNavbar = () => {
    setIsResponsive(!isResponsive);
  };

  return (
    <div className={isResponsive ? 'topnav responsive' : 'topnav'} id="myTopnav">
      <a href="/" className="active fw-bold" id="heading">Portal</a>
      <a href="/">Home</a>
      <a href="/about">About</a>
      {/* Fixing the warning by changing href and using onClick */}
      <a href="#" className="icon" onClick={(e) => { e.preventDefault(); toggleNavbar(); }}>
        <i className="fa fa-bars"></i>
      </a>

      {/* Login and Signup Buttons */}
      <div className="auth-buttons me-2 me-lg-3">
        <Link to="/login" className="nav-link">
          <MDBBtn color='link'>
            Login
          </MDBBtn>
        </Link>
        <Link to="/signup" className="nav-link">
          <MDBBtn>
            Sign up 
          </MDBBtn>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
