import "./DashboardHeader.css";

export default function DashboardHeader({

    name

}){

    return(

        <div className="dashboard-header">

            <div>

                <h1>

                    Welcome,

                    {name}

                    👋

                </h1>

                <p>

                    Here are your AI-powered recommendations.

                </p>

            </div>

        </div>

    );

}