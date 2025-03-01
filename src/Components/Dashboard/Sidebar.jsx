// Sidebar.jsx
import React, { useState } from "react"; 
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
import { useAuth } from "../../context/AuthContext";
import CreatePostModal from "./CreatePostModal"; 

const Sidebar = ({ onContentChange }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isModalOpen, setIsModalOpen] = useState(false); //  State for modal visibility
  const { logout } = useAuth(); // ✅ Get logout function
  

  const handleLogout = () => {
    logout(); // ✅ Call logout function
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="sidebar">
      <div className="icon"><span>N</span>etGrow</div>
      <div className="sidebar-item" onClick={() => onContentChange(<HomeContent />)}>
        <FontAwesomeIcon icon={faHouse} />
        <span>Home</span>
      </div>
      <div className="sidebar-item" onClick={() => onContentChange("Courses Content")}>
        <FontAwesomeIcon icon={faLightbulb} />
        <span>Courses</span>
      </div>
      <div className="sidebar-item" onClick={() => setIsModalOpen(true)}>
        <FontAwesomeIcon icon={faCloudArrowUp} />
        <span>Create</span>
      </div>
      
      <div className="sidebar-item" onClick={handleLogout}>
        <FontAwesomeIcon icon={faRightFromBracket} />
        <span>Logout</span>
      </div>
      <div className="image-div">
        <img
          src="https://i.pinimg.com/564x/31/31/31/3131311567a193a35fc35502987477e2.jpg"
          className="img-fluid"
          alt="Phone"
        />
      </div>

      {/* Include the modal */}
      <CreatePostModal
        isOpen={isModalOpen} // Modal open state
        onClose={() => setIsModalOpen(false)} // Close modal
      />
    </div>
  );
};

export default Sidebar;
