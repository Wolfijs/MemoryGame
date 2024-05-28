import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar.js';
import './css/edit.css'; // Import the new CSS file for edit page styles

function Edit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPassword, setEditedPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log("Fetching user details...");
    const userId = localStorage.getItem('userID');
    console.log("UserID from localStorage:", userId);
    if (userId) {
      const fetchUserDetails = async () => {
        try {
          const url = `http://localhost/memegame/getUser.php?id=${userId}`;
          console.log("Fetching data from URL:", url);
          const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log("Response received from server:", response);
          const data = await response.json();
          console.log('Response from server:', data);
          if (data.success) {
            setUsername(data.data.Username);
            setEmail(data.data.Email);
            setPassword(data.data.Password); // Get password from server
          } else {
            console.error(data.error);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
      fetchUserDetails();
    } else {
      console.log("No userId found in localStorage.");
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUsername(username);
    setEditedEmail(email);
    setEditedPassword(password);
  };

  const handleSaveClick = async () => {
    try {
      // Validation
      if (!editedUsername || !editedEmail || !editedPassword) {
        setError("All fields are required");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editedEmail)) {
        setError("Invalid email format");
        return;
      }

      // Password validation
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(editedPassword)) {
        setError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number");
        return;
      }

      const userId = localStorage.getItem('userID');
      const url = `http://localhost/memegame/editUser.php`;
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: userId,
          editedUsername,
          editedEmail,
          editedPassword
        })
      });
      const data = await response.json();
      if (data.success) {
        setUsername(data.data.Username);
        setEmail(data.data.Email);
        setPassword(data.data.Password); // Update password
        setIsEditing(false);
        setError('');
        console.log("Edit successful");
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setError('');
  };

  const handleUsernameChange = (event) => {
    setEditedUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEditedEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setEditedPassword(event.target.value);
  };

  return (
    <div className={`EditPage ${sidebarOpen ? 'sidebar-open' : ''}`}> {/* Change class name to EditPage */}
      <Sidebar sidebarOpen={sidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">
        <div className="centere">
          <div className="boxs">
            <div className="edit-form">
              <h1>Edit Profile</h1>
              {!isEditing ? (
                <div className="output-container">
                  <p>Username: {username}</p>
                  <p>Email: {email}</p>
                  <p>Password: {password}</p>
                  <button className="edit-button" onClick={handleEditClick}>Edit</button>
                </div>
              ) : (
                <div className="input-container">
                  <input type="text" className="edit-input" value={editedUsername} onChange={handleUsernameChange} placeholder="Enter new username" />
                  <input type="email" className="edit-input" value={editedEmail} onChange={handleEmailChange} placeholder="Enter new email" />
                  <input type="password" className="edit-input" value={editedPassword} onChange={handlePasswordChange} placeholder="Enter new password" />
                  <div className="marg" >
                    <button className="edit-button" onClick={handleSaveClick}>Save</button>
                    <button className="edit-button" onClick={handleCancelClick}>Cancel</button>
                  </div>
                </div>
              )}
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
        </div>
        <button className={`burger-icon ${sidebarOpen ? 'white' : 'black'}`} onClick={toggleSidebar}>
          &#9776;
        </button>
      </div>
    </div>
  );
}

export default Edit;
