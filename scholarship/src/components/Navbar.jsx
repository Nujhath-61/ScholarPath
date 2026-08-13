import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  useLocation();
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  function logout() { localStorage.removeItem("currentUser"); navigate("/"); }
  return <header className="navbar"><Link to="/" className="brand">🎓 ScholarPath</Link><nav><NavLink to="/">Home</NavLink><NavLink to="/scholarships">Scholarships</NavLink><NavLink to="/blogs">Blog</NavLink><NavLink to="/resources">Resources</NavLink></nav>{user ? <div className="nav-user"><Link to="/profile" className="profile-link">My Profile</Link><button className="nav-logout" onClick={logout}>Log out</button></div> : <div className="nav-user"><Link className="login-link" to="/login">Log in</Link><Link className="profile-link signup-link" to="/register">Join free</Link></div>}</header>;
}
