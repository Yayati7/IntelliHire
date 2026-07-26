import "./HistoryCard.css";
import { FaHistory } from "react-icons/fa";

export default function HistoryCard({ history, onOpen }) {
    return (
        <div className="history-card">
            <div className="history-card-info">
                <FaHistory />
                <h3>{history.generatedAt}</h3>
            </div>
            <button onClick={() => onOpen(history.historyId)}>View Top 5</button>
        </div>
    );
}