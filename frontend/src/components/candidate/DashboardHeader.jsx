import "./DashboardHeader.css";

export default function DashboardHeader({ name }) {
    return (
        <div className="dashboard-header">
            <div>
                <h1>Welcome, <span className="gradient-text">{name}</span> 👋</h1>
                <p>Here are your AI-powered recommendations.</p>
            </div>
        </div>
    );
}