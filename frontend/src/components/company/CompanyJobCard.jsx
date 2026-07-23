import "./CompanyJobCard.css";

export default function CompanyJobCard({

    job,

    onEdit,

    onDelete,

    onApplicants

}){

    return(

        <div className="company-job-card">

            <h2>

                {job.title}

            </h2>

            <p>

                <b>Location:</b> {job.location}

            </p>

            <p>

                {job.description}

            </p>

            <p>

                <b>Skills:</b>

                {job.skills}

            </p>

            <div className="company-job-actions">

                <button

                    className="edit-btn"

                    onClick={()=>onEdit(job)}

                >

                    Edit

                </button>

                <button

                    className="delete-btn"

                    onClick={()=>onDelete(job.id)}

                >

                    Delete

                </button>

                <button

                    className="view-btn"

                    onClick={()=>onApplicants(job.id)}

                >

                    Applicants

                </button>

            </div>

        </div>

    );

}