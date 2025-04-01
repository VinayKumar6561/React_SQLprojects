import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/LoginForm.css'; // ✅ Updated CSS Reference
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';

const LoginForm = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.warn(' Please enter both username and password!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/user/login', { username, password });

      if (response.data) {
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('username', response.data.username);
        setIsLoggedIn(true);

        toast.success(' LOGIN SUCCESSFUL! 🎉');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        toast.error(' Invalid Credentials! ❌');
      }
    } catch (error) {
      console.error('Login Error:', error);
      toast.error(' Login Failed! 🚫');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <FontAwesomeIcon icon={faUser} className="user-logo" />
        <h2>Login</h2>

        {/* Username Input */}
        <div className="input-container">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password Input with Show/Hide Feature */}
        <div className="input-container">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <button onClick={handleLogin}>Login</button>

        <p>Don't have an account? <Link to="/register">Register</Link></p>

        {/* Social Media Login */}
        <div className="social-icons">
          <a href="https://www.google.com/"><FontAwesomeIcon icon={faGoogle} /></a>
          <a href="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebook} /></a>
          <a href="https://github.com/"><FontAwesomeIcon icon={faGithub} /></a>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default LoginForm;
