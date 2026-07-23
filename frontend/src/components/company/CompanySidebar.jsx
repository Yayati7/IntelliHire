import {NavLink} from "react-router-dom";
import "./CompanySidebar.css";

export default function CompanySidebar(){

    return(

        <aside className="company-sidebar">

            <h2>

                IntelliHire

            </h2>

            <NavLink to="/company">

                Dashboard

            </NavLink>

            <NavLink to="/company/post-job">

                Post Job

            </NavLink>

            <NavLink to="/company/jobs">

                My Jobs

            </NavLink>

            <NavLink to="/company/applicants">

                Applicants

            </NavLink>

        </aside>

    );

}