import "./ApplicationCard.css";

export default function ApplicationCard({ application }) {

    const getColor = (status) => {

        switch (status) {

            case "NEXT_ROUND":
                return "#16a34a";

            case "REJECTED":
                return "#dc2626";

            default:
                return "#f59e0b";
        }

    };

    return (

        <div className="application-card">

            <div>

                <h2>

                    Job ID : {application.jobId}

                </h2>

                <p>

                    Application ID : {application.id}

                </p>

            </div>

            <span
                style={{
                    background: getColor(application.status),
                    color: "white",
                    padding: "8px 18px",
                    borderRadius: "25px"
                }}
            >

                {application.status}

            </span>

        </div>

    );

}