import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userId'));

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);
  }, []); //  Listen for changes
  

  return (
    <Router>
     <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
          {/* Redirect the root URL to login or dashboard */}
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <RegisterForm />} />
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
    </Routes>

    </Router>
  );
};

export default App;
