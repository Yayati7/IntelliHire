import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import DeveloperLayout from "../../layouts/DeveloperLayout";
import LogsPanel from "../../components/developer/LogsPanel";
import { LOG_SERVICES } from "../../config/logServices";
import "./ServiceLogs.css";

export default function ServiceLogs() {

    const { serviceId } = useParams();
    const navigate = useNavigate();

    const service = LOG_SERVICES.find(s => s.id === serviceId);

    if (!service) {
        return (
            <DeveloperLayout>
                <div className="service-logs-page">
                    <button className="btn btn-outline service-logs-back" onClick={() => navigate("/developer")}>
                        <FaArrowLeft /> Back to Dashboard
                    </button>
                    <h1>Unknown Service</h1>
                    <p>No logs are configured for "{serviceId}".</p>
                </div>
            </DeveloperLayout>
        );
    }

    return (
        <DeveloperLayout>
            <div className="service-logs-page">
                <button className="btn btn-outline service-logs-back" onClick={() => navigate("/developer")}>
                    <FaArrowLeft /> Back to Dashboard
                </button>

                <h1>{service.label} Logs</h1>

                <LogsPanel title={`${service.label} — app.log`} baseUrl={service.baseUrl} />
            </div>
        </DeveloperLayout>
    );
}