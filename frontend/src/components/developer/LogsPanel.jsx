import { useEffect, useRef, useState } from "react";
import { FaTerminal } from "react-icons/fa";
import { getServiceLogs } from "../../services/logService";
import "./LogsPanel.css";

const POLL_INTERVAL = 5000;

function levelClass(line) {
    if (line.includes(" ERROR ")) return "log-error";
    if (line.includes(" WARN ")) return "log-warn";
    if (line.includes(" DEBUG ")) return "log-debug";
    return "log-info";
}

export default function LogsPanel({ title, baseUrl }) {

    const [lines, setLines] = useState([]);
    const [totalLines, setTotalLines] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const scrollRef = useRef(null);

    async function load() {
        try {
            const data = await getServiceLogs(baseUrl, 300);
            setLines(data.lines ?? []);
            setTotalLines(data.totalLines ?? 0);
            setError(false);
        } catch (e) {
            console.log(e);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        load();
        const interval = setInterval(load, POLL_INTERVAL);
        return () => clearInterval(interval);
    }, [baseUrl]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        <div className="logs-panel">
            <div className="logs-panel-header">
                <div className="logs-panel-title">
                    <FaTerminal /> {title}
                </div>
                <div className="logs-panel-meta">
                    <span className="logs-live-dot" />
                    Live · {totalLines} lines
                </div>
            </div>

            <div className="logs-console" ref={scrollRef}>
                {loading && <div className="logs-empty">Loading logs...</div>}

                {!loading && error && (
                    <div className="logs-empty">Could not reach this service's logs endpoint.</div>
                )}

                {!loading && !error && lines.length === 0 && (
                    <div className="logs-empty">No log entries found.</div>
                )}

                {!loading && !error && lines.map((line, i) => (
                    <div key={i} className={`log-line ${levelClass(line)}`}>
                        {line}
                    </div>
                ))}
            </div>
        </div>
    );
}