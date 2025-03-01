import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import EditProfileModal from "./editProfileModal";
import { FaHeart, FaRegComment, FaSmile, FaPaperPlane } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import HomeContent from "../Dashboard/HomeContent"
const ProfileContent = () => {
  // Define metaData first
  const metaData = [
    {
      id: 1,
      username: "JohnDoe",
      profilePicture: "https://i.pinimg.com/564x/31/31/31/3131311567a193a35fc35502987477e2.jpg",
      postImage: "https://i.pinimg.com/564x/31/31/31/3131311567a193a35fc35502987477e2.jpg",
      description: "This is a sample post description",
      likes: 5,
      comments: [
        { username: "Jane", text: "Great post!" },
        { username: "Alice", text: "Thanks for sharing!" },
      ],
    },
    
    // Add more posts as needed
  ];

  // Now initialize state using metaData
  const [profileData, setProfileData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState(metaData);
  const [currentComment, setCurrentComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState({});
  const [showAllComments, setShowAllComments] = useState(false);
  const userId = localStorage.getItem("userId");

 
  useEffect(() => {
    
    if (userId) {
      fetch(`https://studentforumfyp.azurewebsites.net/api/Profile/${userId}`)
        .then((response) => response.json())
        .then((data) => setProfileData(data))
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [userId]);


  const updateProfile = (updatedData) => {
    setProfileData((prevData) => ({
      ...prevData,
      ...updatedData,
      profilePicturebase64: updatedData.pi_profilepicture || prevData.profilePicturebase64,
      extension: updatedData.pi_extension || prevData.extension,
    }));
  };

  // Simulate liking a post by increasing its like count
  const handleLike = (id) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleAddComment = (id, newComment) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, comments: [...post.comments, newComment] } : post
    );
    setPosts(updatedPosts);
    setCurrentComment("");
    setShowEmojiPicker((prev) => ({ ...prev, [id]: false }));
  };

  const handleEmojiClick = (emojiObject, postId) => {
    setCurrentComment((prev) => prev + emojiObject.emoji);
  };

  const toggleComments = () => {
    setShowAllComments((prev) => !prev);
  };

  const toggleEmojiPicker = (postId) => {
    setShowEmojiPicker((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
 };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="profile-section">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="cover-photo">
          {/* <img src="" alt="Cover" /> */}
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <div className="profile-picture-container">
            <img
              className="profile-picture"
              src={
                profileData?.profilePicturebase64
                  ? `data:image/${profileData.extension};base64,${profileData.profilePicturebase64}`
                  : "https://i.pinimg.com/736x/38/b4/5a/38b45af8f71d3414b987203c2a9b1415.jpg"
              }
              alt="Profile"
            />
            {/* Edit Button Positioned Over Profile Image */}
            <button className="edit-profile-button" onClick={handleOpenModal}>
              <FontAwesomeIcon icon={faPencil} />
            </button>
          </div>
          <h2 className="profile-name">{profileData?.name || "Your Name"}</h2>
          <p className="profile-role">{profileData?.role || "Role not set"}</p>
          <p className="profile-location">{profileData?.location || "Location not set"}</p>
        </div>
      </div>

      {/* Profile Main Content */}
      <div className="profile-main">
        {/* About Section */}
        <div className="profile-about">
          <h3>About</h3>
          <p>{profileData?.about || "Write something about yourself..."}</p>
        </div>
      </div>
      {/* Render Edit Profile Modal */}
      <EditProfileModal isOpen={isModalOpen} onClose={handleCloseModal}
       userId={userId}
       profileData={profileData}
       updateProfile={updateProfile} />
       

       <div className="post-main">
         <HomeContent/>
       </div>

      {/* Internal CSS for Profile Section */}
      <style>{`
        .profile-section {
          font-family: Arial, sans-serif;
          margin: 0 auto;
          max-width: 600px;
        }

        /* Profile Header */
        .profile-header {
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 7px;
          text-align: center;
        }

        .cover-photo {
          background-color: #BFD3D6;
          height: 150px;
          border-radius: 8px;
        }

        /* .cover-photo img {
          width: 100%;
          object-fit: cover;
        } */

        .profile-details {
          margin-top: -50px;
          text-align: center;
        }

        .profile-picture-container {
          position: relative;
          display: inline-block;
        }

        .profile-picture {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 5px solid white;
          object-fit: cover;
        }

        /* Edit Profile Button Positioned at Bottom-Right of Profile Picture */
        .edit-profile-button {
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: 28px;
          height: 28px;
          background-color: #ffffff;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s ease-in-out;
        }

        .edit-profile-button:hover {
          background-color: #f0f0f0;
        }

        .profile-name {
          font-size: 18px;
          font-weight: 500;
          color: #333;
          margin: 5px 0 0;
        }

        .profile-role, .profile-location {
          font-size: 12px;
          color: #777;
          margin: 2px 0;
        }

        /* Profile Main Content */
        .profile-main {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        /* About Section */
        .profile-about {
          background: white;
          border-radius: 8px;
          padding: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .profile-about h3 {
          font-size: 18px;
          font-weight: 500;
          color: #333;
        }

        .profile-about p {
          font-size: 12px;
          color: #555;
        }

        .post-main{
           background: #ffffff;
           border-radius: 8px;
          padding: 12px;
          margin-top: 8px;
        }        
        


        /* Posts Section............................................... */
        .profile-posts {
          background: white;
          border-radius: 8px;
          padding: 12px;
        }

        .profile-posts h3 {
          font-size: 25px;
          font-weight: 500;
          color: #333;
        }

        .post-feed {
          padding: 16px;
          // background: #288aba;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .post-card {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .post-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px;
          background: linear-gradient(to right, #f0f0f0, #ffffff);
          border-bottom: 1px solid #ddd;
        }

        .header-info {
          display: flex;
          flex-direction: column;
        }

        .profile-post-pic {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 5px solid white;
          object-fit: cover;
        }

        .username {
          font-size: 10px;
          font-weight: 700;
          color: #333;
        }

        .timestamp {
          font-size: 10px;
          color: #888;
        }

        .post-image {
          width: 100%;
          height: auto;
        }

        .post-actions {
          display: flex;
          justify-content: space-between;
          padding: 12px 16px;
          background: #fafafa;
          border-top: 1px solid #eee;
        }

        .action-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .action-icon {
          cursor: pointer;
          font-size: 18px;
          color: #666;
        }

        .action-icon:hover {
          color: #e74c3c;
        }

        .description {
          padding: 0px 16px;
          font-size: 14px;
          color: #444;
        }

        .comments-section {
          padding: 12px 16px;
          border-top: 1px solid #eee;
        }

        .comment {
          font-size: 14px;
          color: #555;
          margin-bottom: 8px;
        }

        .view-all {
          font-size: 14px;
          color: #007bff;
          cursor: pointer;
          margin-top: 8px;
        }

        .add-comment {
          margin-top: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
        }

        .comment-input {
          flex: 1;
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ddd;
          border-radius: 20px;
          outline: none;
        }

        .comment-input:focus {
          border-color: #007bff;
        }

        .emoji-icon {
          font-size: 22px;
          color: #555;
          cursor: pointer;
        }

        .post-icon {
          font-size: 20px;
          color: #007bff;
          cursor: pointer;
        }

        .emoji-picker {
          position: absolute;
          bottom: 1px;
          right: 0;
          z-index: 10;
          transform: scale(0.7);
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        @media (max-width: 768px) {
          .profile-picture {
            width: 80px;
            height: 80px;
          }

          .edit-profile-button {
            width: 24px;
            height: 24px;
            font-size: 12px;
          }

          .profile-name {
            font-size: 16px;
          }

          .profile-role {
            font-size: 12px;
          }
          
        }
      `}</style>
    </div>
  );
};

export default ProfileContent;
