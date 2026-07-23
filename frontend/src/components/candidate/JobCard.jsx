import "./JobCard.css";

export default function JobCard({

    job,

    resumeUploaded,

    onApply

}){

    return(

        <div className="job-card">

            <h2>

                {job.title}

            </h2>

            <p>

                <b>Company :</b> {job.company}

            </p>

            <p>

                <b>Location :</b> {job.location}

            </p>

            <p>

                <b>AI Match :</b> {job.finalScore}%

            </p>

            <p>

                {job.description}

            </p>

            <button

                disabled={!resumeUploaded}

                onClick={()=>onApply(job.jobId)}

            >

                {

                    resumeUploaded ?

                    "Apply"

                    :

                    "Upload Resume To Apply"

                }

            </button>

        </div>

    );

}