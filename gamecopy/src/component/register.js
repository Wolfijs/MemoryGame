import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar.js';
import './css/signup.css';

function SignUp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('register');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: ''
    });
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formValid = true;
    const newErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  
    // Validation logic
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (formData.username.trim() === '') {
      newErrors.username = 'Username is required';
      formValid = false;
    }
  
    if (formData.email.trim() === '' || !emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      formValid = false;
    }
  
    if (formData.password.length < 8 || !/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password) || !/\d/.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
      formValid = false;
    }
  
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      formValid = false;
    }
  
    // If form is valid, submit data
    if (formValid) {
      try {
        const response = await fetch('http://localhost/memegame/register.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
          setSuccessMessage('Registration successful!');
          setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
          
          setTimeout(() => {
            setSuccessMessage('');
            window.location.href = '/login'; 
          }, 3000);
        } else {
          if (data.error.includes('email')) {
            newErrors.email = 'Email is already registered';
          }
          if (data.error.includes('username')) {
            newErrors.username = 'Username is already taken';
          }
          setErrors(newErrors);
          setSuccessMessage('');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // If form is invalid, set errors
      setErrors(newErrors);
      setSuccessMessage('');
    }
  };

  return (
    <div className="container">
      <div className={`Main ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar sidebarOpen={sidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="content">
          <div className="centered-box">
            <div className="box">
              <form className="login-form" onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="input-container">
                  <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                  <p className="error">{errors.username}</p>
                </div>
                <div className="input-container">
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                  <p className="error">{errors.email}</p>
                </div>
                <div className="input-container">
                  <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                  <p className="error">{errors.password}</p>
                </div>
                <div className="input-container">
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                  <p className="error">{errors.confirmPassword}</p>
                </div>
                <button type="submit" className="">{successMessage ? 'Register' : 'Register'}</button>
                {successMessage && <p>{successMessage}</p>}
                <p>If you're registered and want to log in, <Link to="/login">click here</Link>.</p>
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

export default SignUp;
