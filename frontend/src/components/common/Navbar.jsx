import { Link, useNavigate } from "react-router-dom";
import "./../../styles/Navbar.css";

export default function Navbar() {

    const navigate = useNavigate();

    return (

        <nav className="navbar">

            <div
                className="logo"
                onClick={() => navigate("/")}
            >
                IntelliHire
            </div>

            <ul className="nav-links">

                <li>
                    <a href="#features">
                        Features
                    </a>
                </li>

                <li>
                    <a href="#workflow">
                        How It Works
                    </a>
                </li>

                <li>
                    <a href="#roles">
                        Roles
                    </a>
                </li>

                <li>
                    <a href="#tech">
                        Tech Stack
                    </a>
                </li>

            </ul>

            <div className="nav-buttons">

                <Link to="/login">

                    <button className="login-btn">

                        Login

                    </button>

                </Link>

            </div>

        </nav>

    );

}