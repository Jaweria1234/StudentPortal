import React, { useState } from "react";
import Header from "../Components/Dashboard/Header";
import Sidebar from "../Components/Dashboard/Sidebar";
import HomeContent from "../Components/Dashboard/HomeContent";
import RightSidebar from "../Components/Dashboard/RightSidebar";
import "./Dashboard.css";

const Dashboard = () => {
  const [content, setContent] = useState(<HomeContent />); // Set default content to Home component

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const userName = "Jave";
  const profilePic = "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=740";
  const role = "student";

  return (
    <div className="dashboard">
      <Header userName={userName} profilePic={profilePic} role={role} />
      <div className="main-content">
        <Sidebar onContentChange={handleContentChange} />
        {/* Content Area */}
        <div className="dashboard-content">
          {content} {/* Render the content here */}
        </div>
        <RightSidebar/>
        {/* <div className="rightSidebar">hello</div> */}
      </div>
    </div>
  );
};

export default Dashboard;
