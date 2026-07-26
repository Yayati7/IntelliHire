import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";
import "./../../styles/Navbar.css";

export default function DeveloperNavbar() {

    const navigate = useNavigate();
    const { logout } = useAuth();

    return (
        <nav className="navbar navbar-scrolled">
            <div className="navbar-inner">
                <div className="logo" onClick={() => navigate("/developer")}>
                    <span className="logo-mark">IH</span>
                    IntelliHire
                </div>
                <div className="nav-buttons">
                    <button
                        className="login-btn logout-btn"
                        onClick={() => { navigate("/"); logout(); }}
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}