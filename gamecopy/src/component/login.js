import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import './css/login.css';

function Login({ onLogin }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await onLogin(formData.username, formData.password);
      if (result.success) {
        navigate('/'); // Redirect to home page after successful login
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="container">
      <div className={`Main ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar sidebarOpen={sidebarOpen} />
        <div className="content">
          <div className="centereds">
            <div className='boxe'>
              <form className="login-form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <button type="submit" className="">Login</button>
                {error && <p className="error">{error}</p>}
                <p className="Click">If you're not registered, <Link to="/register">click here</Link>.</p>
              </form>
            </div>
          </div>
          <button className={`burger-icon ${sidebarOpen ? 'white' : 'black'}`} onClick={toggleSidebar}>
            &#9776;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
