import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaPlusCircle, FaBriefcase, FaUsers } from "react-icons/fa";
import "./CompanySidebar.css";

export default function CompanySidebar() {

    return (

        <aside className="company-sidebar">

            <div className="company-sidebar-title">Company</div>

            <NavLink to="/company/home" className={({ isActive }) => isActive ? "active" : ""}>
                <FaTachometerAlt /> Dashboard
            </NavLink>

            <NavLink to="/company/post-job" className={({ isActive }) => isActive ? "active" : ""}>
                <FaPlusCircle /> Post Job
            </NavLink>

            <NavLink to="/company/jobs" className={({ isActive }) => isActive ? "active" : ""}>
                <FaBriefcase /> My Jobs
            </NavLink>

            <NavLink to="/company/applicants" className={({ isActive }) => isActive ? "active" : ""}>
                <FaUsers /> Applicants
            </NavLink>

        </aside>

    );

}