import "./CompanyJobCard.css";
import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";

export default function CompanyJobCard({ job, onEdit, onDelete, onApplicants }) {

    return (

        <div className="company-job-card">

            <h2>{job.title}</h2>

            <p><b>Location:</b> {job.location}</p>

            <p>{job.description}</p>

            <p><b>Skills:</b> {job.skills}</p>

            <div className="company-job-actions">

                <button className="edit-btn" onClick={() => onEdit(job)}>
                    <FaEdit /> Edit
                </button>

                <button className="delete-btn" onClick={() => onDelete(job.id)}>
                    <FaTrash /> Delete
                </button>

                <button className="view-btn" onClick={() => onApplicants(job.id)}>
                    <FaUsers /> Applicants
                </button>

            </div>

        </div>

    );

}