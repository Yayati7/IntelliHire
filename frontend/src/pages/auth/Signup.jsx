import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
    FaArrowLeft,
    FaUser,
    FaEnvelope,
    FaLock,
    FaUserGraduate,
    FaBuilding,
    FaLaptopCode,
} from "react-icons/fa";

import "./Auth.css";

function Signup() {

    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();
    const [search] = useSearchParams();
    const role = search.get("role") || "USER";

    const roleLabel = { USER: "Candidate", RECRUITER: "Company", ADMIN: "Developer" };
    const roleIcon = { USER: <FaUserGraduate />, RECRUITER: <FaBuilding />, ADMIN: <FaLaptopCode /> };

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function signup() {
        try {
            await axios.post("http://localhost:8081/auth/signup", {
                ...form,
                role
            });
            toast.success("Account created. Please log in.");
            navigate(`/login?role=${role}`);
        } catch (e) {
            console.log(e);
            toast.error("Signup failed. Email may already be in use.");
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
                    <p>Join as a {roleLabel[role] || role} and let explainable AI do the matching.</p>
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

                    <h1>Create Account</h1>

                    <span className="auth-role-badge">
                        Signing up as <strong>{roleLabel[role] || role}</strong>
                    </span>

                    <div className="auth-form">
                        <div className="input-group">
                            <FaUser />
                            <input placeholder="Full name" name="name" onChange={handleChange} />
                        </div>

                        <div className="input-group">
                            <FaEnvelope />
                            <input placeholder="Email address" name="email" onChange={handleChange} />
                        </div>

                        <div className="input-group">
                            <FaLock />
                            <input placeholder="Password" type="password" name="password" onChange={handleChange} />
                        </div>

                        <button className="btn btn-primary auth-submit" onClick={signup}>
                            Sign Up
                        </button>
                    </div>

                    <p className="auth-footer-text">
                        Already have an account?{" "}
                        <span onClick={() => navigate(`/login?role=${role}`)}>
                            Log in
                        </span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

export default Signup;