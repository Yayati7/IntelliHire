import "./JobCard.css";

export default function JobCard({
    job,
    resumeUploaded,
    appliedStatus,
    onApply
}){

    const isApplied = appliedStatus === "APPLIED" || appliedStatus === "NEXT_ROUND";

    let buttonLabel = "Apply";
    if (!resumeUploaded) buttonLabel = "Upload Resume To Apply";
    else if (isApplied) buttonLabel = "Applied";

    return(
        <div className="job-card">
            <h2>{job.title}</h2>
            <p><b>Company :</b> {job.company}</p>
            <p><b>Location :</b> {job.location}</p>

            {
                resumeUploaded && typeof job.finalScore === "number" &&
                <p><b>AI Match :</b> {job.finalScore}%</p>
            }

            <p>{job.description}</p>

            <button
                disabled={!resumeUploaded || isApplied}
                onClick={()=>onApply(job.jobId)}
            >
                {buttonLabel}
            </button>
        </div>
    );
}