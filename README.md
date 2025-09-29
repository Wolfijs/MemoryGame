# Memory Game 🧠

A modern memory card matching game built with **React 18** frontend and **PHP** backend, featuring user authentication, score tracking, and multiple game categories.

## 🎮 Features

- **Memory Card Game**: Match pairs of cards with increasing difficulty levels
- **User Authentication**: Secure login/registration system with PHP backend
- **Score Tracking**: Persistent high scores and leaderboards
- **Multiple Categories**: Choose from fruits, animals, sports equipment, or emoji faces
- **Achievements System**: Track your progress and unlock achievements
- **Responsive Design**: Modern UI with React components and CSS styling
- **Real-time Updates**: Live score updates and game state management

## 🏗️ Architecture

### Frontend (React)
- **Framework**: React 18 with React Router for navigation
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: Custom CSS with component-based styling
- **Routing**: React Router DOM for single-page application navigation

### Backend (PHP)
- **API**: RESTful PHP endpoints for data operations
- **Database**: MySQL with user and score management
- **Authentication**: Secure user login with password hashing
- **Data Persistence**: Score tracking and user profile management

## 📁 Project Structure

```
MemoryGame/
├── gamecopy/                 # React Frontend
│   ├── src/
│   │   ├── component/        # React Components
│   │   │   ├── game.js       # Main game logic
│   │   │   ├── home.js       # Homepage
│   │   │   ├── login.js      # Login component
│   │   │   ├── register.js   # Registration component
│   │   │   ├── leaderboard.js # Score leaderboard
│   │   │   ├── achievements.js # Achievement system
│   │   │   └── sidebar.js    # Navigation sidebar
│   │   ├── App.js           # Main React app with routing
│   │   └── index.js         # React entry point
│   └── package.json         # React dependencies
├── memegame/                # PHP Backend
│   ├── login.php           # User authentication
│   ├── register.php        # User registration
│   ├── score.php           # Score management
│   ├── leaderboard.php     # Score retrieval
│   └── db.php              # Database connection
└── memory.sql              # Database schema
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **PHP** (v7.4 or higher)
- **MySQL** (v5.7 or higher)
- **Apache/Nginx** web server

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MemoryGame
   ```

2. **Set up the database**
   ```bash
   # Import the database schema
   mysql -u root -p < memory.sql
   ```

3. **Configure the backend**
   - Update database credentials in `memegame/db.php`
   - Ensure PHP files are accessible via web server

4. **Install React dependencies**
   ```bash
   cd gamecopy
   npm install
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost/memegame/`

## 🎯 How to Play

1. **Register/Login**: Create an account or sign in
2. **Choose Category**: Select from fruits, animals, sports, or emojis
3. **Match Cards**: Click cards to reveal symbols and find matching pairs
4. **Score Points**: Complete levels to increase your score
5. **Track Progress**: View your achievements and leaderboard position

## 🛠️ Technologies Used

### Frontend
- **React 18.3.1** - UI framework
- **React Router DOM 6.23.1** - Client-side routing
- **React Scripts 5.0.1** - Build tools
- **CSS3** - Styling and animations

### Backend
- **PHP 8.3.1** - Server-side scripting
- **MySQL 5.7.24** - Database management
- **RESTful API** - Data communication

## 📊 Database Schema

### Users Table
- `UserID` (Primary Key)
- `Username` (Unique)
- `Email` (Unique)
- `Password` (Hashed)

### Scores Table
- `ScoreID` (Primary Key)
- `UserID` (Foreign Key)
- `Score` (Integer)
- `Level` (Integer)
- `Timestamp` (DateTime)

## 🔧 API Endpoints

- `POST /memegame/login.php` - User authentication
- `POST /memegame/register.php` - User registration
- `POST /memegame/score.php` - Submit game score
- `GET /memegame/leaderboard.php` - Get leaderboard data
- `POST /memegame/checkAuth.php` - Verify user session

## 🎨 Customization

- **Card Categories**: Add new symbol categories in `game.js`
- **Styling**: Modify CSS files in `component/css/`
- **Game Rules**: Adjust difficulty and scoring in `game.js`
- **Database**: Extend schema for additional features

## 👨‍💻 Developer

**Built by Wolfijs**

---

*Enjoy playing the Memory Game! 🎮*
