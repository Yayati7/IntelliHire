import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "./../../styles/Navbar.css";

export default function CandidateNavbar() {

    const navigate = useNavigate();
    const { logout } = useAuth();

    return (
        <nav className="navbar navbar-scrolled">
            <div className="navbar-inner">
                <div className="logo" onClick={() => navigate("/candidate/home")}>
                    <span className="logo-mark">IH</span>
                    IntelliHire
                </div>

                <div className="nav-buttons">
                    <button className="login-btn" onClick={() => navigate("/candidate/profile")}>
                        <FaUserCircle /> Profile
                    </button>
                    <button
                        className="login-btn logout-btn"
                        onClick={() => {
                            navigate("/");
                            logout();
                        }}
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}