import { NavLink } from "react-router-dom";
import {
    FaTachometerAlt,
    FaShieldAlt,
    FaUser,
    FaBriefcase,
    FaClipboardList,
    FaBrain,
    FaChartLine
} from "react-icons/fa";
import { LOG_SERVICES } from "../../config/logServices";
import "./DeveloperSidebar.css";

const SERVICE_ICONS = {
    auth: <FaShieldAlt />,
    user: <FaUser />,
    job: <FaBriefcase />,
    application: <FaClipboardList />,
    recommendation: <FaBrain />,
    analytics: <FaChartLine />
};

export default function DeveloperSidebar() {

    return (

        <div className="developer-sidebar">

            <div className="developer-sidebar-title">Developer</div>

            <NavLink to="/developer" end className={({ isActive }) => isActive ? "active" : ""}>
                <FaTachometerAlt /> Dashboard
            </NavLink>

            <div className="developer-sidebar-title developer-sidebar-group">Service Logs</div>

            {LOG_SERVICES.map(service => (
                <NavLink
                    key={service.id}
                    to={`/developer/logs/${service.id}`}
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    {SERVICE_ICONS[service.id]} {service.label}
                </NavLink>
            ))}

        </div>

    );

}