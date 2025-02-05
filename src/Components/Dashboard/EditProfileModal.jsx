import React, { useState } from "react";

const EditProfileModal = ({ isOpen, onClose }) => {
  const initialState = {
    name: "",
    role: "",
    location: "",
    about: "",
    profilePicture: null,
  };

  const [formData, setFormData] = useState(initialState);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    onClose();
  };

  const handleClose = () => {
    setFormData(initialState);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={handleClose}>&times;</button>
        <h2>Edit Profile</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
          </div>
          <div className="input-group">
            <label>Role</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Enter your role" />
          </div>
          <div className="input-group">
            <label>Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Enter your location" />
          </div>
          <div className="input-group">
            <label>About</label>
            <textarea name="about" value={formData.about} onChange={handleChange} placeholder="Write about yourself"></textarea>
          </div>
          <div className="input-group">
            <label>Profile Picture</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {formData.profilePicture && (
              <img src={URL.createObjectURL(formData.profilePicture)} alt="Preview" className="profile-preview" />
            )}
          </div>
          <button type="submit" className="save-btn">Save Changes</button>
        </form>
      </div>

      {/* Updated CSS for Better Design */}
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-container {
          background: #ffffff;
          padding: 20px;
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          position: relative;
          animation: fadeIn 0.3s ease-in-out;
        }

        .modal-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 22px;
          color: #777;
          cursor: pointer;
          transition: color 0.3s;
        }

        .modal-close:hover {
          color: #333;
        }

        h2 {
          font-size: 18px;
          color: #333;
         
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 300px; /* Enables scroll if content is too long */
          overflow-y: auto;
          padding-right: 10px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        label {
          font-weight:500;
          font-size: 12px;
          color: #000000;
        }

        input, textarea {
          width: 100%;
          padding: 6px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 12px;
          outline: none;
          transition: border 0.3s, box-shadow 0.3s;
          background: #f9f9f9;
        }

        textarea {
          resize: none;
          height: 80px;
        }

        input:focus, textarea:focus {
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0.3, 123, 255, 0.3);
        }

        input[type="file"] {
          padding: 5px;
          border: none;
          background: none;
        }

        .profile-preview {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-top: 10px;
          object-fit: cover;
          border: 2px solid #ddd;
        }

        .save-btn {
          padding: 7px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          background-color: #007bff;
          color: white;
          transition: background 0.3s, transform 0.2s;
          width: 100%;
        }

        .save-btn:hover {
          background-color: #0056b3;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 500px) {
          .modal-container {
            width: 95%;
            padding: 20px;
          }

          .profile-preview {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default EditProfileModal;
