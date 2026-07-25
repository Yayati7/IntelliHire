import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./../../styles/Navbar.css";

export default function DeveloperNavbar() {

    const navigate = useNavigate();
    const { logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="logo" onClick={() => navigate("/developer")}>
                IntelliHire
            </div>
            <div className="nav-buttons">
                <button
                    className="login-btn"
                    onClick={() => { navigate("/"); logout(); }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}