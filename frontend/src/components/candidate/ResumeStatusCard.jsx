import "./ResumeStatusCard.css";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function ResumeStatusCard({ resumeUploaded, onUpload, onUpdate }) {
    return (
        <div className="resume-status">
            <div className="resume-status-info">
                <div className={`resume-status-icon ${resumeUploaded ? "done" : "pending"}`}>
                    {resumeUploaded ? <FaCheckCircle /> : <FaExclamationCircle />}
                </div>
                <div>
                    <h2>Resume</h2>
                    <p>{resumeUploaded ? "Resume uploaded successfully." : "No resume uploaded."}</p>
                </div>
            </div>

            <button className="btn btn-primary" onClick={resumeUploaded ? onUpdate : onUpload}>
                {resumeUploaded ? "Update Resume" : "Upload Resume"}
            </button>
        </div>
    );
}