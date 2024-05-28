
import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar.js';
import './css/leaderboard.css';

function Leaderboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [leaderboardType, setLeaderboardType] = useState('All Time');
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [tableAnimation, setTableAnimation] = useState(false);
    const userID = localStorage.getItem('userID');
    const [activeTab, setActiveTab] = useState('leaderboard');

    useEffect(() => {
        fetchLeaderboardData();
    }, [leaderboardType]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleLeaderboardType = () => {
        setLeaderboardType(leaderboardType === 'All Time' ? 'Personal' : 'All Time');
        setTableAnimation(true);
        setTimeout(() => {
            setTableAnimation(false);
        }, 400);
    };

    const fetchLeaderboardData = async () => {
        try {
            let url = 'http://localhost/memegame/alltime.php';
            if (leaderboardType === 'Personal') {
                url = `http://localhost/memegame/personal.php?userID=${userID}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch leaderboard data');
            }
            const data = await response.json();
            if (!Array.isArray(data) && !data.data) {
                throw new Error('Invalid data format');
            }
            setLeaderboardData(data.data || data);
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
        }
    };

    return (
        <div className={`Main ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <Sidebar sidebarOpen={sidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="content">
                <div className="centered">
                    <h1>LeaderBoard</h1>
                    <h3>Click button to change</h3>
                    <button
                        className={`toggle-leaderboard-type ${leaderboardType === 'All Time' ? 'left' : 'right'}`}
                        onClick={toggleLeaderboardType}
                    >
                        <span className="button-text">{leaderboardType}</span>
                    </button>
                    <div className="scrollable-table-container">
                        <div className="scrollable-table-container table-container">
                            <table className={`leaderboard-table ${tableAnimation ? 'animate' : ''}`}>
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Name</th>
                                        <th>Level</th>
                                        <th>Score</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboardData.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{entry.Username}</td>
                                            <td>{entry.Level}</td>
                                            <td>{entry.Score}</td>
                                             
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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

export default Leaderboard;
