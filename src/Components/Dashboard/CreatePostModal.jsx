import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import EmojiPicker from "emoji-picker-react";

const CreatePostModal = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Function to reset the modal state (description, file preview, selected file)
  const resetModal = () => {
    setDescription("");
    setSelectedFile(null);
    setFilePreview("");
    setShowEmojiPicker(false);
  };

  // Combined close handler that resets state and calls parent's onClose
  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleFileSelection = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setFilePreview(reader.result); // Base64 preview
          setSelectedFile(file); // Original file reference
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handlePost = async () => {
    if (!description || !selectedFile) {
      alert("Please add a description and select a file.");
      return;
    }

    const convertToBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () =>
          resolve(reader.result.split(",")[1]); // Extract base64 string
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });

    try {
      const base64File = await convertToBase64(selectedFile);
      const fileExtension = selectedFile.name.split(".").pop();

      const payload = {
        up_postID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        up_description: description,
        up_base64: base64File,
        up_fileextension: fileExtension,
        up_createdon: new Date().toISOString(),
        up_userid: "afc9a0bf-bfd3-4f29-bd24-1c7362982e5b",
      };

      console.log("Payload:", payload);

      const response = await fetch(
        "https://studentforumfyp.azurewebsites.net/api/Upload",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      // Check if the response is valid and handle errors
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Failed to upload post:", errorData);
        alert(`Failed to upload post: ${errorData || "Unknown error"}`);
        return;
      }

      const responseData = await response.text();
      const parsedData = responseData ? JSON.parse(responseData) : {};
      console.log("Response Data:", parsedData);

      alert("Post uploaded successfully!");
      handleClose(); // Reset state and close modal after successful upload
    } catch (error) {
      console.error("Error uploading post:", error);
      alert("An error occurred while uploading the post.");
    }
  };

  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modal: {
      background: "white",
      borderRadius: "10px",
      width: "500px",
      padding: "20px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      position: "relative",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "15px",
      border: "none",
      background: "none",
      fontSize: "18px",
      color: "#888",
      cursor: "pointer",
    },
    header: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
    },
    profileImage: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      marginRight: "12px",
    },
    username: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#333",
    },
    textArea: {
      width: "100%",
      height: "100px",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      outline: "none",
      resize: "none",
      fontSize: "14px",
      background: "#f9f9f9",
      marginBottom: "15px",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    actionIcons: {
      display: "flex",
      gap: "10px",
    },
    icon: {
      fontSize: "16px",
      color: "#555",
      cursor: "pointer",
      transition: "color 0.3s",
    },
    postButton: {
      background: "#3b71ca",
      color: "white",
      padding: "5px 20px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
      transition: "background 0.3s",
    },
  };

  return (
    <div style={styles.overlay} onClick={handleClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        <div style={styles.header}>
          <img
            src="https://i.pinimg.com/564x/31/31/31/3131311567a193a35fc35502987477e2.jpg"
            alt="Profile"
            style={styles.profileImage}
          />
          <span style={styles.username}>Jave</span>
        </div>
        <textarea
          placeholder="What do you want to talk about?"
          style={styles.textArea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {filePreview && (
          <div style={{ maxHeight: "150px", overflow: "auto", marginBottom: "15px" }}>
            <img
              src={filePreview}
              alt="Preview"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        )}
        <div style={styles.footer}>
          <div style={styles.actionIcons}>
            <span
              style={styles.icon}
              title="Photo Gallery"
              onClick={handleFileSelection}
            >
              <FontAwesomeIcon icon={faImages} />
            </span>
            <span
              style={styles.icon}
              title="Add Emoji"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              😊
            </span>
          </div>
          <button style={styles.postButton} onClick={handlePost}>
            Post
          </button>
        </div>
        {showEmojiPicker && (
  <div
    className="emoji-picker"
    style={{
      position: "absolute",
      bottom: "50px",
      right: "50%",
      left: "50px",
      zIndex: 10,
      width: "250px", // Set a fixed width
      height: "300px", // Set a fixed height to limit size
      // overflowY: "auto", // Enables vertical scrolling
      overflow: "hidden", // Hides horizontal scroll
      transform: "scale(0.8)", // Reduce size
      transformOrigin: "bottom left", // Keeps alignment
      background: "white", // Ensures visibility
      borderRadius: "10px", // Smooth edges
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // Adds shadow effect
    }}
  >
    <EmojiPicker
      height="100%" // Makes sure it fills the container
      width="100%"
      onEmojiClick={(emojiData, event) => {
        console.log("Selected Emoji:", emojiData);
        setDescription((prev) => prev + emojiData.emoji);
        setShowEmojiPicker(false);
      }}
    />
  </div>
)}

        {/* {showEmojiPicker && (
          <div
            className="emoji-picker"
            style={{ position: "absolute", bottom: "60px", right: "10px", zIndex: 10 }}
          >
            <EmojiPicker
              onEmojiClick={(emojiData, event) => {
                console.log("Selected Emoji:", emojiData);
                setDescription((prev) => prev + emojiData.emoji);
                setShowEmojiPicker(false);
              }}
            />
          </div>
        )} */}
      </div>
      {/* Internal CSS for mobile responsiveness */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="padding: 10px"] {
            padding: 5px !important;
          }
          div[style*="width: 500px"] {
            width: 90% !important;
          }
          .emoji-picker {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CreatePostModal;
