import React from "react";
import "./Header.css";

const Header = ({ userName, profilePic, role }) => {
  return (
    <header className="header">
      <div>
        <h2 className="heading">"Knowledge is Love and Light and Vision."</h2>
      </div>
      <div className="header-content">
        <div className="user-identity">
        <h2 className="user-name">{userName}</h2>
        <p className="user-role">{role}</p>
        </div>
        <img src={profilePic} alt="User Profile" className="profile-pic" />
      </div>
    </header>
  );
};

export default Header;

