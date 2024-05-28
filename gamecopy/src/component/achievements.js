import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar.js';
import achievement1 from './img/1.jpg';
import achievement5 from './img/5.jpg';
import achievement10 from './img/10.jpg';
import achievement25 from './img/25.jpg';
import achievement50 from './img/50.jpg';
import achievement75 from './img/75.jpg';
import achievement100 from './img/100.jpg';
import './css/achievements.css';

function Achievements({ userID }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('achievements');
  const [userLevel, setUserLevel] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserLevel();
  }, []);

  const fetchUserLevel = () => {
    console.log('UserID from props:', userID); // Debugging log
    if (userID) {
      fetch(`http://localhost/memegame/lvl.php?userID=${userID}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setUserLevel(data.userLevel);
          setError(null); // Reset error state if request succeeds
        })
        .catch(error => {
          console.error('Error fetching user level:', error);
          setError(error.message); // Set error state with error message
        });
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const achievements = [
    { number: 1, image: achievement1 },
    { number: 5, image: achievement5 },
    { number: 10, image: achievement10 },
    { number: 25, image: achievement25 },
    { number: 50, image: achievement50 },
    { number: 75, image: achievement75 },
    { number: 100, image: achievement100 }
  ];

  return (
    <div className={`Main ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar sidebarOpen={sidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">
        <div className="centered">
          <h1>Your Achievement</h1>
          <h3>Webpage designed and built  by ValtersCo ©</h3>
          <div className="achievements-container">
            {achievements.map((achievement, index) => (
              (userLevel >= achievement.number || userLevel === 100) && (
                <div key={index} className="achievement-item">
                  <img src={achievement.image} alt={`Achievement ${achievement.number}`} />
                  <div className="achievement-text">Level {achievement.number}</div>
                </div>
              )
            ))}
          </div>
        </div>
        <button className={`burger-icon ${sidebarOpen ? 'white' : 'black'}`} onClick={toggleSidebar}>
          ☰
        </button>
      </div>
    </div>
  );
}

export default Achievements;
