import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import '../styles/RegisterForm.css';

// FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      toast.warn('Please fill out all fields!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error(' Passwords do not match! ❌');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/user/register', formData);

      if (response.data === 'User Registered Successfully') {
        toast.success(' User Registration Successful! 🎉');
        setTimeout(() => navigate('/login'), 2000); // Redirect after 2s
      } else {
        toast.error(' Registration Failed! 🚫');
      }
    } catch (error) {
      toast.error(' Error Registering User! ⚠️');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* User Icon Above Form */}
        <FontAwesomeIcon icon={faUser} className="user-logo" />
        
        <h2>Register</h2>

        {/* First Name Input */}
        <div className="input-container">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} />
        </div>

        {/* Last Name Input */}
        <div className="input-container">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} />
        </div>

        {/* Email Input */}
        <div className="input-container">
          <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        </div>

        {/* Username Input */}
        <div className="input-container">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        </div>

        {/* Password Input */}
        <div className="input-container">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        </div>

        {/* Confirm Password Input */}
        <div className="input-container">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
        </div>

        <button onClick={handleRegister}>Register</button>

        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default RegisterForm;
