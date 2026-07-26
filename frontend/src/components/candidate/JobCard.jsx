import "./JobCard.css";

export default function JobCard({ job, resumeUploaded, appliedStatus, onApply }) {

    const isApplied = appliedStatus === "APPLIED" || appliedStatus === "NEXT_ROUND";

    let buttonLabel = "Apply";
    if (!resumeUploaded) buttonLabel = "Upload Resume To Apply";
    else if (isApplied) buttonLabel = "Applied";

    return (
        <div className="job-card">
            <h2>{job.title}</h2>

            <div className="job-card-meta">
                <span><b>Company:</b> {job.company}</span>
                <span><b>Location:</b> {job.location}</span>
            </div>

            {resumeUploaded && typeof job.finalScore === "number" && (
                <div className="job-card-match">
                    <div className="job-card-match-bar">
                        <div className="job-card-match-fill" style={{ width: `${job.finalScore}%` }} />
                    </div>
                    <span className="job-card-match-label">{job.finalScore}% Match</span>
                </div>
            )}

            <p className="job-card-desc">{job.description}</p>

            <button
                disabled={!resumeUploaded || isApplied}
                onClick={() => onApply(job.jobId)}
            >
                {buttonLabel}
            </button>
        </div>
    );
}