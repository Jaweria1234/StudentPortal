import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../context/AuthContext";

const Header = ({ onViewProfile }) => {
  const [userName, setUserName] = useState(""); // Store username
  const [profilePic, setProfilePic] = useState(""); // Store profile picture
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null); // Reference to the profile menu
  const profilePicRef = useRef(null); // Reference to the profile picture
  const { logout } = useAuth(); // ✅ Get logout function

  // 🟢 Load data from local storage when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");  // ✅ Fetch user object
    const storedProfile = localStorage.getItem("profileData"); // ✅ Fetch profile object

    if (storedUser) {
      const user = JSON.parse(storedUser); // ✅ Convert to object
      setUserName(user.name || "Guest"); // ✅ Use correct key
    }

    if (storedProfile) {
      const profile = JSON.parse(storedProfile); // ✅ Convert to object
      if (profile.pi_profilepicture && profile.pi_extension) {
        setProfilePic(
          `data:image/${profile.pi_extension};base64,${profile.pi_profilepicture}`
        ); // ✅ Convert base64 to image
      }
    }
  }, []);


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
    logout(); // ✅ Call logout function
    localStorage.removeItem("user"); // 🛑 Remove user data on logout
    localStorage.removeItem("profileData");
    navigate("/login"); // Navigate to the login page
  };

  // Effect to handle clicks outside the menu
  useEffect(() => {
    // Function to detect click outside of the profile menu or profile picture
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) && 
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
          <h2 className="user-name">{userName || "Guest"}</h2>
        </div>
        <div className="profile-container">
          <img
            ref={profilePicRef}
            src={profilePic || "https://i.pinimg.com/736x/38/b4/5a/38b45af8f71d3414b987203c2a9b1415.jpg"}
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
