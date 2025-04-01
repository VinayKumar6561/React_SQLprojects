import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css'; // ✅ Ensure this is correctly imported

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  const handleLogout = () => {
    localStorage.removeItem('userId'); // Remove user session
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login
  };

  return (
    <nav className="navbar">
      {isLoggedIn ? (
        <>
          <Link to="/dashboard" className="nav-item">Dashboard</Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          {/* Show Register button only if NOT on Register page */}
          {location.pathname !== '/register' && (
            <button className="nav-btn" onClick={() => navigate('/register')}>Register</button>
          )}

          <h2 id='t-nav'>To Do List</h2>

          {/* Show Login button only if NOT on Login page */}
          {location.pathname !== '/login' && (
            <button className="nav-btn" onClick={() => navigate('/login')}>Login</button>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;
