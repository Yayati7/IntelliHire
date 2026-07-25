import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../../styles/Navbar.css";

export default function Navbar() {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

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

            <div
                className="nav-buttons"
                style={{ position: "relative" }}
            >

                <button
                    className="login-btn"
                    onClick={() => setOpen(prev => !prev)}
                >
                    Login
                </button>

                {open && (

                    <div
                        style={{
                            position: "absolute",
                            top: "48px",
                            right: 0,
                            background: "white",
                            borderRadius: 10,
                            boxShadow: "0 8px 25px rgba(0,0,0,.15)",
                            overflow: "hidden",
                            minWidth: 180,
                            zIndex: 1000
                        }}
                    >

                        <div
                            style={{
                                padding: "14px 18px",
                                cursor: "pointer",
                                color: "#111827",
                                borderBottom: "1px solid #eee"
                            }}
                            onClick={() => {
                                setOpen(false);
                                navigate("/login?role=USER");
                            }}
                        >
                            Login as Candidate
                        </div>

                        <div
                            style={{
                                padding: "14px 18px",
                                cursor: "pointer",
                                color: "#111827"
                            }}
                            onClick={() => {
                                setOpen(false);
                                navigate("/login?role=RECRUITER");
                            }}
                        >
                            Login as Company
                        </div>

                    </div>

                )}

            </div>

        </nav>

    );

}