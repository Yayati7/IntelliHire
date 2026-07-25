import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./../../styles/Navbar.css";

export default function CandidateNavbar() {

    const navigate = useNavigate();
    const { logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="logo" onClick={() => navigate("/candidate/home")}>
                IntelliHire
            </div>
            <div className="nav-buttons" style={{ display: "flex", gap: 15 }}>
                <button className="login-btn" onClick={() => navigate("/candidate/profile")}>
                    Profile
                </button>
                <button
                    className="login-btn"
                    onClick={() => {
                        navigate("/");
                        logout();
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}