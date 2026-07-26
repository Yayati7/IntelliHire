import "./StatsCard.css";

export default function StatsCard({ title, value, icon }) {
    return (
        <div className="stats-card">
            {icon && <div className="stats-card-icon">{icon}</div>}
            <div>
                <h2>{value}</h2>
                <p>{title}</p>
            </div>
        </div>
    );
}