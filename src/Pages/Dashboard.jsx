import React, { useState } from "react";
import Header from "../Components/Dashboard/Header";
import Sidebar from "../Components/Dashboard/Sidebar";
import HomeContent from "../Components/Dashboard/HomeContent";
import ProfileContent from "../Components/Dashboard/ProfileContent";
import "./Dashboard.css";

const Dashboard = () => {
  const [content, setContent] = useState(<HomeContent />); // Default content

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleViewProfile = () => {
    setContent(<ProfileContent />); // Switch to Profile content
  };

  const userName = "Jave";
  const profilePic =
    "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=740";
  const role = "Student";

  return (
    <div className="dashboard">
      <Sidebar onContentChange={handleContentChange} />
      <div className="dashboard-main">
        <Header
          userName={userName}
          profilePic={profilePic}
          role={role}
          onViewProfile={handleViewProfile} // Pass the callback
        />
        <div className="dashboard-content">{content}</div>
      </div>
    </div>
  );
};

export default Dashboard;
