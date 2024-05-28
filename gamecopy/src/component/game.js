import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar.js';
import './css/game.css';

function Game() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('game');
  const [randomRGB, setRandomRGB] = useState([0, 0, 0]);
  const [level, setLevel] = useState(1);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedSets, setMatchedSets] = useState(0);
  const [cards, setCards] = useState([]);
  const [timer, setTimer] = useState(10);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [cardBackgroundColor, setCardBackgroundColor] = useState(localStorage.getItem('cardBackgroundColor') || '#f0f0f0');
  const [selectedCategory, setSelectedCategory] = useState('fruits');
  const [categoryDisabled, setCategoryDisabled] = useState(false);

  const symbolCategories = {
    fruits: ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🥝', '🍍', '🍊', '🍋', '🍐', '🍑', '🥭', '🥥', '🍈'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔'],
    sportsEquipment: ['⚽️', '🏀', '🏈', '⚾️', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸', '🥊', '🥋', '⛳️', '🎣', '🎿'],
    emojiFaces: ['😀',  '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍']
  };

  const toggleSidebar = () => {
    if (!gameStarted) {
      setSidebarOpen(!sidebarOpen);
    }
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

  const startGame = () => {
    setGameStarted(true);
    setCategoryDisabled(true,
      ); 
  };

  const restartGame = () => {
    setShowGameOverModal(false);
    setLevel(1);
    setScore(0);
    setTimer(10);
    setGameStarted(false);
    setCards([]);
    setCategoryDisabled(false); 
  };

  const createBoard = () => {
    const numPairs = level + 2;
    let newCards = [];
    const selectedSymbols = symbolCategories[selectedCategory];
    for (let i = 0; i < numPairs; i++) {
      const symbol = selectedSymbols[i % selectedSymbols.length];
      newCards.push({ symbol, id: `${symbol}-${i}-1`, hidden: true, disabled: false });
      newCards.push({ symbol, id: `${symbol}-${i}-2`, hidden: true, disabled: false });
      newCards.push({ symbol, id: `${symbol}-${i}-3`, hidden: true, disabled: false });
    }
    setCards(shuffle(newCards));
    setSelectedCards([]);
    setMatchedSets(0);
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const selectCard = (cardId) => {
    const newCards = cards.map(card =>
      card.id === cardId ? { ...card, hidden: false } : card
    );
    setCards(newCards);

    const selectedCard = newCards.find(card => card.id === cardId);
    const newSelectedCards = [...selectedCards, selectedCard];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 3) {
      checkMatch(newSelectedCards, newCards);
    }
  };

  const checkMatch = (selectedCards, newCards) => {
    const [first, second, third] = selectedCards;
    if (first.symbol === second.symbol && second.symbol === third.symbol) {
      setMatchedSets(matchedSets + 1);
      setScore(score + 3);
      setSelectedCards([]);
    } else {
      setTimeout(() => {
        const hiddenCards = newCards.map(card =>
          selectedCards.includes(card) ? { ...card, hidden: true } : card
        );
        setCards(hiddenCards);
        setSelectedCards([]);
      }, 1000);
    }
  };

  useEffect(() => {
    let interval;

    if (gameStarted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1); 
      }, 1000);
    }

    if (timer === 0) {
      clearInterval(interval);
      setShowGameOverModal(true);
      sendScoreToBackend();
    }

    return () => clearInterval(interval);
  }, [gameStarted, timer]);

  useEffect(() => {
    if (gameStarted) {
      createBoard();
    }
  }, [level, gameStarted, selectedCategory]);

  useEffect(() => {
    if (matchedSets === level + 2) {
      setTimer((prevTimer) => prevTimer + 5);
      setLevel((prevLevel) => prevLevel + 1);
      setMatchedSets(0);
    }
  }, [matchedSets]);

  useEffect(() => {
    if (showGameOverModal) {
      console.log('Game over! Score:', score);
    }
  }, [showGameOverModal, score]);

  const sendScoreToBackend = async () => {
    const userID = localStorage.getItem('userID');
    if (!userID) {
      console.error('User ID not found in localStorage');
      return;
    }

    try {
      const response = await fetch('http://localhost/memegame/score.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userID, score, level })
      });

      const text = await response.text();
      console.log('Response text:', text);

      if (!response.ok) {
        console.error('Failed response:', text);
        throw new Error('Network response was not ok: ' + response.statusText);
      }

      const responseData = JSON.parse(text);

      if (responseData.success) {
        console.log('Score inserted successfully');
      } else {
        console.error('Failed to insert score:', responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setCardBackgroundColor(newColor);
    localStorage.setItem('cardBackgroundColor', newColor);
  };

  const handleCategoryChange = (event) => {
    if (!gameStarted) { // Only allow category change if the game hasn't started
      const newCategory = event.target.value;
      setSelectedCategory(newCategory);
    }
  };

  return (
    <div className={`Game ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {!gameStarted && <Sidebar sidebarOpen={sidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />}
      <div className="contents">
        <button className={`burger-icon ${sidebarOpen ? 'white' : 'black'}`} onClick={toggleSidebar}>
          ☰
        </button>
        <div className="game-container">
          <h1>Memory Game</h1>
          <h3>Webpage designed and built  by ValtersCo ©</h3>
          <h3>Select the color: <input type="color" value={cardBackgroundColor} onChange={handleColorChange} /></h3>
          <h3>Select the symbol category:
            <select value={selectedCategory} className="symbol-dropdown" onChange={handleCategoryChange} disabled={categoryDisabled}>
              <option value="fruits">Fruits</option>
              <option value="animals">Animals</option>
              <option value="sportsEquipment">Sports Equipment</option>
              <option value="emojiFaces">Emoji Faces</option>
            </select>
          </h3>
          {!gameStarted && (
            <>
              <button id="start-game" className="big-button" onClick={startGame} onMouseEnter={handleButtonHover} style={{ backgroundColor: `rgb(${randomRGB[0]}, ${randomRGB[1]}, ${randomRGB[2]})` }}>
                Start Game
              </button>
            </>
          )}
          {gameStarted && (
            <div className="level-score-timer">
              <p>Level: {level}</p>
              <p>Score: {score}</p>
              <p>Timer: {timer} seconds</p>
            </div>
          )}
          <div className="game-board-wrapper">
            <div className="game-board">
              {cards.map(card => (
                <div
                  key={card.id}
                  className={`card ${card.hidden ? 'hidden' : ''}`}
                  style={{ backgroundColor: cardBackgroundColor }}
                  onClick={() => (card.disabled ? null : selectCard(card.id))}
                >
                  <div className="card-content">
                    <span className={`front-face ${card.hidden ? 'hidden' : ''}`}>
                      <span className="fruit-symbol">{card.symbol}</span>
                    </span>
                    <span className="back-face"></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showGameOverModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Game Over</h2>
            <p>Your score : {score}</p>
            <p>Your level : {level}</p>
            <button onClick={restartGame}>Restart</button>
            <button onClick={() => window.location.href = '/'}>Go to Homepage</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
