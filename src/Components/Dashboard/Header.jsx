import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ userName, profilePic, onViewProfile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null); // Reference to the profile menu
  const profilePicRef = useRef(null); // Reference to the profile picture

  // Function to toggle the menu when the profile picture is clicked
  const handleProfileClick = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu open/close
  };

  // Function to close the menu when the "View Profile" option is clicked
  const handleViewProfile = () => {
    setIsMenuOpen(false); // Close the menu
    onViewProfile(); // Notify the parent to change content
  };

  // Function to handle the Sign Out logic
  const handleSignOut = () => {
    setIsMenuOpen(false); // Close the menu
    navigate("/login"); // Navigate to the login page
  };

  // Effect to handle clicks outside the menu
  useEffect(() => {
    // Function to detect click outside of the profile menu or profile picture
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) && 
        !profilePicRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false); // Close the menu if click is outside
      }
    };

    // Adding event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <div className="user-identity">
          <h2 className="user-name">{userName}</h2>
          {/* <p className="user-role">{role}</p> */}
        </div>
        <div className="profile-container">
          <img
            ref={profilePicRef}
            src={profilePic}
            alt="User Profile"
            className="profile-pic"
            onClick={handleProfileClick} // Toggle menu on click
          />
          {isMenuOpen && (
            <div ref={menuRef} className="profile-menu">
              <div className="menu-item" onClick={handleViewProfile}>
                View Profile
              </div>
              <div className="menu-item" onClick={handleSignOut}>
                Sign Out
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
