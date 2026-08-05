import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    return (
        <header className="navbar">

            <Link to="/blogs" className="brand">
                <span>🎓 ScholarPath</span>
            </Link>


            <nav>

                <Link to="/blogs">
                    Blog
                </Link>

                <Link to="/scholarships">
                    Scholarships
                </Link>

                <Link to="/resources">
                    Resources
                </Link>

            </nav>


            <Link 
                to="/profile" 
                className="profile-link"
            >
                My Profile
            </Link>


        </header>
    );
}


export default Navbar;