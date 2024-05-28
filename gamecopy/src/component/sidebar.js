import React from 'react';
import { Link } from 'react-router-dom';
import './css/sidebar.css';

const Sidebar = ({ sidebarOpen, activeTab, setActiveTab }) => {

  const userID = localStorage.getItem('userID');

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost/memegame/logout.php', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem('userID'); 
        window.location.href = '/'; 
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Render sidebar only if user is logged in
  if (!userID) {
    return null;
  }

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <Link to="/" className={`sidebar-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>Home</Link>
        <Link to="/game" className={`sidebar-link ${activeTab === 'game' ? 'active' : ''}`} onClick={() => setActiveTab('game')}>Game</Link>
        <Link to="/leaderboard" className={`sidebar-link ${activeTab === 'leaderboard' ? 'active' : ''}`} onClick={() => setActiveTab('leaderboard')}>Leaderboard</Link>
        <Link to="/achievements" className={`sidebar-link ${activeTab === 'achievements' ? 'active' : ''}`} onClick={() => setActiveTab('achievements')}>Achievements</Link>
        <Link to="/edit" className={`sidebar-link ${activeTab === 'edit' ? 'active' : ''}`} onClick={() => setActiveTab('edit')}>Edit Profile</Link>
        <Link  className={`sidebar-link ${activeTab === 'logout' ? 'active' : ''}`} onClick={handleLogout}>Logout</Link>
       
      </div>
    </div>
  );
}

export default Sidebar;
