import "./CandidateSidebar.css";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaClipboardList, FaUserCircle } from "react-icons/fa";

export default function CandidateSidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-title">Candidate</div>

            <NavLink
                to="/candidate/home"
                className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
            >
                <FaTachometerAlt /> Dashboard
            </NavLink>

            <NavLink
                to="/candidate/applications"
                className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
            >
                <FaClipboardList /> Applications
            </NavLink>

            <NavLink
                to="/candidate/profile"
                className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
            >
                <FaUserCircle /> Profile
            </NavLink>
        </div>
    );
}