import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './component/home';
import Login from './component/login';
import SignUp from './component/register';
import Game from './component/game';
import Sidebar from './component/sidebar';
import Leaderboard from './component/leaderboard';
import Edit from './component/edit';
import Achievements from './component/achievements';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  const checkAuth = async () => {
    const userID = localStorage.getItem('userID');
    if (userID) {
      try {
        const response = await fetch('http://localhost/memegame/checkAuth.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userID })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setIsAuthenticated(result.isAuthenticated);
      } catch (error) {
        console.error('Error during auth check:', error);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('http://localhost/memegame/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (result.success) {
        localStorage.setItem('userID', result.userID);
        console.log('userID stored in localStorage:', result.userID); // Add this line
        await checkAuth();
      }
      return result;
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, message: 'Failed to fetch' };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('userID');
    setIsAuthenticated(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <BrowserRouter>
      <Sidebar
        sidebarOpen={sidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAuthenticated={isAuthenticated}
        signOut={signOut}
        toggleSidebar={toggleSidebar}
      />
      <Routes>
        <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/game"
          element={isAuthenticated ? <Game /> : <Navigate to="/login" />}
        />
        <Route
          path="/leaderboard"
          element={isAuthenticated ? <Leaderboard /> : <Navigate to="/login" />}
        />
        <Route path="/edit"
          element={isAuthenticated ? <Edit /> : <Navigate to="/login" />} />

        <Route
          path="/achievements"
          element={
            isAuthenticated ? (
              <Achievements userID={localStorage.getItem('userID')} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>


    </BrowserRouter>
  );
}
