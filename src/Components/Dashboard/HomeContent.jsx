import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaHeart, FaRegComment, FaSmile, FaPaperPlane } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";


const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const MenuIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 1.5rem;
`;

const MenuList = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  min-width: 150px;
  z-index: 100;
`;

const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;


const PostDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [currentComment, setCurrentComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState({});
  const [showAllComments, setShowAllComments] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [openMenus, setOpenMenus] = useState({});
  
  const toggleMenu = (postId) => {
    setOpenMenus((prevMenus) => ({
      ...prevMenus,
      [postId]: !prevMenus[postId],
    }));
  };

  //post delete
  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://studentforumfyp.azurewebsites.net/api/Post/${postId}`);
      
      // Update the UI: Remove the deleted post from the list
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };
  
  
  // const fetchFeed = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://studentforumfyp.azurewebsites.net/api/Feed",
  //       { params: { pageNumber, pageSize: 10 } }
  //     );
  //     console.log("Feed response:", response.data);
  //     if (!Array.isArray(response.data.posts)) {
  //       console.error("Expected response.data.posts to be an array, but got:", response.data);
  //       return;
  //     }
  //     const transformedPosts = response.data.posts.map((item) => ({
  //       id: item.af_postID,
  //       username: item.af_name,
  //       profilePicture: "default-profile.jpg", // Adjust as needed
  //       postImage:
  //         "data:image/" +
  //         item.af_fileextension.replace(".", "") +
  //         ";base64," +
  //         item.af_base64,
  //       description: item.af_description,
  //       likes: item.af_likes,
  //       comments: [], // Assuming comments are not provided by the endpoint
  //     }));
  //     // Append new posts to the feed
  //     setPosts((prevPosts) => [...prevPosts, ...transformedPosts]);
  //     // Check if there are more posts to load (using totalCount from API if available)
  //     if (posts.length + transformedPosts.length >= response.data.totalCount) {
  //       setHasMore(false);
  //     } else {
  //       setPageNumber((prevPage) => prevPage + 1);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching feed:", error);
  //   }
  // };


  // Function to fetch feed data (using pageNumber and pageSize)
  const fetchFeed = async () => {
    try {
      const response = await axios.get(
        "https://studentforumfyp.azurewebsites.net/api/Feed",
        { params: { pageNumber, pageSize: 10 } }
      );
  
      if (!Array.isArray(response.data.posts)) {
        console.error("Expected response.data.posts to be an array, but got:", response.data);
        return;
      }
  
      const transformedPosts = response.data.posts.map((item) => ({
        id: item.af_postID,
        username: item.af_name,
        profilePicture: "default-profile.jpg",
        postImage: "data:image/" + item.af_fileextension.replace(".", "") + ";base64," + item.af_base64,
        description: item.af_description,
        likes: item.af_likes,
        comments: [],
      }));
  
      // Avoid re-rendering with the same data
      if (transformedPosts.length === 0) {
        setHasMore(false);
        return;
      }
  
      setPosts((prevPosts) => [...prevPosts, ...transformedPosts]);
      
      // Update pageNumber for next fetch
      setPageNumber((prevPage) => prevPage + 1);
  
      // Check if there are more posts to load
      if (posts.length + transformedPosts.length >= response.data.totalCount) {
        setHasMore(false);
      }
  
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };
  
  // Initial fetch
  useEffect(() => {
    fetchFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Like function
  const handleLike = async (id) => {
    try {
      const response = await axios.patch(
        `https://studentforumfyp.azurewebsites.net/api/Feed/${id}/like`
      );
      
      if (response.status === 200) {
        const updatedPosts = posts.map((post) =>
          post.id === id ? { ...post, likes: response.data.likes } : post
        );
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  // const handleAddComment = (id, newComment) => {
  //   const updatedPosts = posts.map((post) =>
  //     post.id === id
  //       ? { ...post, comments: [...post.comments, newComment] }
  //       : post
  //   );
  //   setPosts(updatedPosts);
  //   setCurrentComment("");
  //   setShowEmojiPicker((prev) => ({ ...prev, [id]: false }));
  // };

  const handleAddComment = async (postId) => {
    const userId = localStorage.getItem("userId");
  
    if (!userId || !/^[0-9a-fA-F-]{36}$/.test(userId)) {
      console.error("🚨 Invalid userId:", userId);
      return;
    }
  
    if (!currentComment.trim()) {
      console.error("🚨 Comment is empty!");
      return;
    }
  
    const requestBody = {
      pc_commentid: crypto.randomUUID(), // Generate a unique UUID
      pc_postid: postId,
      pc_comment: currentComment,
      pc_commentName: "You", // Replace with actual user name if available
      pc_userid: userId,
    };
  
    console.log("📤 Sending Request Body:", JSON.stringify(requestBody, null, 2));
  
    try {
      const response = await axios.post(
        "https://studentforumfyp.azurewebsites.net/api/AddComments",
        requestBody,
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("✅ Comment added successfully:", response.data);
  
      // Update the comments of the post instantly
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  { username: "You", text: currentComment },
                ],
              }
            : post
        )
      );
  
      setCurrentComment("");
  
    } catch (error) {
      console.error("❌ Error adding comment:", error);
      if (error.response) {
        console.error("📜 API Response Data:", error.response.data);
      }
    }
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
      [postId]: !prev[postId], // Toggle emoji picker for the specific post
    }));
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchFeed}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p style={{ textAlign: "center" }}>No more posts</p>}
    >
      <div className="post-feed">
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            {/* Header */}
            <div className="post-header">
              <img
                src={post.profilePicture}
                alt={`${post.username}'s profile`}
                className="profile-picture"
              />
              <div className="header-info">
                <h3 className="username">{post.username}</h3>
              </div>
              <MenuContainer>
              <MenuIcon icon={faEllipsisV} className="menu-icon" onClick={() => toggleMenu(post.id)} />
              <MenuList isOpen={openMenus[post.id]}>
               <MenuItem onClick={() => handleDelete(post.id)}>Delete</MenuItem>
             </MenuList>
              </MenuContainer>

              {/* <FontAwesomeIcon icon={faEllipsisV} className="menu-icon" /> */}
            </div>

            {/* Post Image */}
            <img src={post.postImage} alt="Post" className="post-image" />

            {/* Actions */}
            <div className="post-actions">
              <div className="action-group">
                <FaHeart
                  className="action-icon like-icon"
                  onClick={() => handleLike(post.id)}
                />
                <span className="likes-count">{post.likes} Likes</span>
              </div>
              <div className="action-group">
                <FaRegComment className="action-icon comment-icon" />
                <span>{post.comments.length} Comments</span>
              </div>
            </div>

            {/* Description */}
            <p className="description">{post.description}</p>
            <button className="internship-button" onClick={() => console.log("Internship button clicked!")}>
                Internship
            </button>

            {/* Comments Section */}
            <div className="comments-section">
              {post.comments
                .slice(0, showAllComments ? post.comments.length : 2)
                .map((comment, index) => (
                  <div key={index} className="comment">
                    <strong>{comment.username}</strong> {comment.text}
                  </div>
                ))}
              {post.comments.length > 2 && !showAllComments && (
                <div className="view-all" onClick={toggleComments}>
                  <span>View all {post.comments.length} comments</span>
                </div>
              )}
              {showAllComments && post.comments.length > 2 && (
                <div className="view-all" onClick={toggleComments}>
                  <span>Show less comments</span>
                </div>
              )}

              {/* Add Comment Section */}
              <div className="add-comment">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={currentComment}
                  onChange={(e) => setCurrentComment(e.target.value)}
                  onFocus={() => setShowEmojiPicker((prev) => ({ ...prev, [post.id]: false }))} // Close emoji picker when typing
                  className="comment-input"
                />
                <FaSmile
                  className="emoji-icon"
                  onClick={() => toggleEmojiPicker(post.id)}
                />
                {currentComment && (
                  <FaPaperPlane
                  className="post-icon"
                  onClick={() => handleAddComment(post.id)}
                />
                
                )}
                {showEmojiPicker[post.id] && (
                  <div className="emoji-picker">
                    <EmojiPicker
                      onEmojiClick={(emojiObject) => handleEmojiClick(emojiObject, post.id)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Internal CSS */}
      <style>{`
        .post-feed {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 600px;
          margin: 20px auto;
          font-family: 'Arial', sans-serif;
          padding: 10px;
        }

        .post-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        // .post-header {
        //   display: flex;
        //   align-items: center;
        //   justify-content: space-between;
        //   gap: 16px;
        //   padding: 16px;
        //   background: linear-gradient(to right, #f0f0f0, #ffffff);
        //   border-bottom: 1px solid #ddd;
        // }

        // .profile-picture {
        //   width: 50px;
        //   height: 50px;
        //   border-radius: 50%;
        //   border: 2px solid #ddd;
        //   object-fit: cover;
        //   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        // }

        // .header-info {
        //   display: flex;
        //   flex-direction: column;
        // }

        // .username {
        //   font-size: 16px;
        //   font-weight: 700;
        //   color: #333;
        // }



        .post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.profile-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid #ddd;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header-info {
  flex-grow: 1;
}

.username {
  font-size: 16px;
  font-weight: 700;
  color: #333;
}

.menu-icon {
  font-size: 18px;
  cursor: pointer;
  color: #666;
  transition: color 0.3s ease;
}

.menu-icon:hover {
  color: #333;
}


        .timestamp {
          font-size: 12px;
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
          gap: 8px;
        }

        .action-icon {
          cursor: pointer;
          font-size: 20px;
          color: #666;
        }

        .action-icon:hover {
          color: #e74c3c;
        }

        .description {
          padding: 12px 16px;
          font-size: 14px;
          color: #444;
        }

        .internship-button {
           background-color: #3B71CA;
           color: white;
           border: none;
           padding: 5px 10px;
           margin-left: 10px;
           border-radius: 5px;
           cursor: pointer;
           transition: 0.3s;
         }

        .internship-button:hover {
           background-color: #0056b3;
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
          font-size: 20px;
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
          bottom: 1px; /* moved above emoji icon */
          // width: 200px;
          // height: 200px;
          right: 0;
       
          z-index: 10;
          overflow: hidden; 
          transform: scale(0.7);
          background: "white", // Ensures visibility
          borderRadius: "10px", // Smooth edges
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)", 
        }
        @media (max-width: 768px) {
          .emoji-picker-react {
            width: 120px  !important;
            height: 120px  !important;
          }
        }
      `}</style>
    </InfiniteScroll>
  );
};

export default PostDisplay;
