
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar.js';
import './css/home.css';

function HomePage({ isAuthenticated }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [randomRGB, setRandomRGB] = useState([0, 0, 0]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const generateRandomColor = () => {
    return [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
  };

  useEffect(() => {
    setRandomRGB(generateRandomColor());
  }, []);

  const handleButtonHover = () => {
    setRandomRGB(generateRandomColor());
  };

  return (
    <div className={`Main ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar sidebarOpen={sidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">
        <div className="centered">
          <h1>Welcome to Homepage</h1>
          <h3>Webpage designed and built  by ValtersCo ©</h3>
          <Link to={isAuthenticated ? "/game" : "/login"} className="big-button" onMouseEnter={handleButtonHover} style={{ backgroundColor: `rgb(${randomRGB[0]}, ${randomRGB[1]}, ${randomRGB[2]})` }}>
            {isAuthenticated ? "Play Game" : "Login to play"}
          </Link>
        </div>
        <button className={`burger-icon ${sidebarOpen ? 'white' : 'black'}`} onClick={toggleSidebar}>
          &#9776;
        </button>
      </div>
    </div>
  );
}

export default HomePage;
