import axios from "axios";
import { useState, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
    FaArrowLeft,
    FaEnvelope,
    FaLock,
    FaUserGraduate,
    FaBuilding,
    FaLaptopCode,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import "./Auth.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { login, logout, user } = useAuth();
    const [search] = useSearchParams();
    const role = search.get("role");

    const roleLabel = { USER: "Candidate", RECRUITER: "Company", ADMIN: "Developer" };
    const roleIcon = { USER: <FaUserGraduate />, RECRUITER: <FaBuilding />, ADMIN: <FaLaptopCode /> };
    const roleTagline = {
        USER: "Upload your resume and let explainable AI find roles matched to you.",
        RECRUITER: "Post jobs and discover candidates ranked by hybrid AI matching.",
        ADMIN: "Monitor platform health, models and AI insights.",
    };

    useEffect(() => {
        // If a session is still active when this page becomes visible
        // (including via browser back/forward cache), force logout so
        // the forward button can't silently re-enter the app.
        if (user) {
            logout();
        }

        // Remember / restore last attempted role for Google OAuth back/forward
        if (role) {
            sessionStorage.setItem("lastLoginRole", role);
        } else {
            const savedRole = sessionStorage.getItem("lastLoginRole");
            if (savedRole) {
                navigate(`/login?role=${savedRole}`, { replace: true });
            }
        }

        function handlePageShow(event) {
            if (event.persisted && user) {
                logout();
            }
        }

        window.addEventListener("pageshow", handlePageShow);

        return () => window.removeEventListener("pageshow", handlePageShow);
    }, []);

    async function normalLogin() {

        try {
            const res = await axios.post(
                "http://localhost:8081/auth/login",
                { email, password }
            );

            const actualRole = res.data.role;

            if (role && actualRole !== role) {
                toast.error(
                    `This email is registered as a ${roleLabel[actualRole] || actualRole} account. ` +
                    `Please use the ${roleLabel[actualRole] || actualRole} login option instead.`
                );
                return;
            }

            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);

            login(res.data);

            if (actualRole === "USER") {
                navigate("/candidate/home", { replace: true });
            } else if (actualRole === "RECRUITER") {
                navigate("/company/home", { replace: true });
            } else if (actualRole === "ADMIN") {
                if (res.data.email !== "yayatimannsingh7@gmail.com") {
                    toast.error("Access Denied");
                    return;
                }
                navigate("/developer", { replace: true });
            }

        } catch (e) {
            const message = e?.response?.data?.message || "Login failed. Please check your credentials.";
            toast.error(message);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-visual">
                <div className="auth-visual-glow" aria-hidden="true" />
                <motion.div
                    className="auth-visual-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="auth-visual-icon">
                        {roleIcon[role] || <FaUserGraduate />}
                    </div>
                    <h2>IntelliHire</h2>
                    <p>
                        {roleTagline[role] ||
                            "Explainable AI hiring — matching candidates to roles with transparent, model-backed reasoning."}
                    </p>
                </motion.div>
            </div>

            <div className="auth-panel">
                <motion.div
                    className="auth-card"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <button className="auth-back" onClick={() => navigate("/")}>
                        <FaArrowLeft /> Home
                    </button>

                    <h1>Welcome Back</h1>

                    {role && (
                        <span className="auth-role-badge">
                            Logging in as <strong>{roleLabel[role] || role}</strong>
                        </span>
                    )}

                    {role !== "ADMIN" && (
                        <>
                            <div className="auth-form">
                                <div className="input-group">
                                    <FaEnvelope />
                                    <input
                                        placeholder="Email address"
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="input-group">
                                    <FaLock />
                                    <input
                                        placeholder="Password"
                                        type="password"
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>

                                <button className="btn btn-primary auth-submit" onClick={normalLogin}>
                                    Login
                                </button>
                            </div>

                            <div className="auth-divider">or continue with</div>
                        </>
                    )}

                    <button
                        className="google-btn"
                        onClick={() => {
                            let oauthRole = "USER";
                            if (role === "RECRUITER") oauthRole = "RECRUITER";
                            if (role === "ADMIN") oauthRole = "ADMIN";

                            window.location.href =
                                `http://localhost:8081/oauth2/authorization/google?role=${oauthRole}`;
                        }}
                    >
                        <FcGoogle size={20} /> Login With Google
                    </button>

                    {role !== "ADMIN" && (
                        <p className="auth-footer-text">
                            New here?{" "}
                            <span onClick={() => navigate(`/signup?role=${role || "USER"}`)}>
                                Create an account
                            </span>
                        </p>
                    )}

                    {role === "ADMIN" && (
                        <p className="auth-note">
                            Developer access requires signing in with the authorized Google account.
                        </p>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default Login;