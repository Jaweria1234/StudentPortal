import React from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faLightbulb,
  faUser,
  faCloudArrowUp,
  faComments,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import HomeContent from "./HomeContent"; // Ensure you have the HomeContent component
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onContentChange }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Logic for clearing user session data can go here if needed
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="sidebar">
      <div className="sidebar-item" onClick={() => onContentChange(<HomeContent />)}>
        <FontAwesomeIcon icon={faHouse} />
        <span>Home</span> {/* Changed anchor to span for consistency */}
      </div>
      <div className="sidebar-item" onClick={() => onContentChange("Courses Content")}>
        <FontAwesomeIcon icon={faLightbulb} />
        <span>Courses</span> {/* Changed anchor to span */}
      </div>
      <div className="sidebar-item" onClick={() => onContentChange("Profile Content")}>
        <FontAwesomeIcon icon={faUser} />
        <span>Profile</span> {/* Changed anchor to span */}
      </div>
      <div className="sidebar-item" onClick={() => onContentChange("Upload Content")}>
        <FontAwesomeIcon icon={faCloudArrowUp} />
        <span>Create</span> {/* Changed anchor to span */}
      </div>
      <div className="sidebar-item" onClick={() => onContentChange("Group Chats Content")}>
        <FontAwesomeIcon icon={faComments} />
        <span>Group Chats</span> {/* Changed anchor to span */}
      </div>
      <div className="sidebar-item" onClick={() => onContentChange("Settings Content")}>
        <FontAwesomeIcon icon={faGear} />
        <span>Setting</span> {/* Changed anchor to span */}
      </div>
      <div className="sidebar-item" onClick={handleLogout}>
        <FontAwesomeIcon icon={faRightFromBracket} />
        <span>Logout</span> {/* Changed anchor to span */}
      </div>
      <div className="image-div">
      <img
              src="https://i.pinimg.com/564x/31/31/31/3131311567a193a35fc35502987477e2.jpg"
              className="img-fluid"
              alt="Phone"
            />
      </div>
    </div>
  );
};

export default Sidebar;
