import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Applications.css";

import { useAuth } from "../../context/AuthContext";

import {
    getUserApplicationDetails
} from "../../services/applicationService";

export default function Applications() {

    const { user } = useAuth();

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);

    useEffect(() => {

        if(user){

            loadApplications();

        }

    }, [user]);

    async function loadApplications() {

        try {

            const data =

            await getUserApplicationDetails(

                user.userId

            );

            setApplications(

                data

            );

        }

        catch (e) {

            console.log(e);

        }

    }

    if(applications.length===0){

        return(

            <div className="applications-page empty-applications">

                <h1>

                    📄

                </h1>

                <h3>

                    You haven't applied for any jobs yet.

                </h3>

                <button

                    onClick={()=>navigate("/candidate/home")}

                >

                    Go to Jobs

                </button>

            </div>

        );

    }

    return (

        <div className="applications-page">

            <h2>

                My Applications

            </h2>

            <table>

                <thead>

                <tr>

                    <th>Application ID</th>

                    <th>Job Title</th>

                    <th>Company</th>

                    <th>Location</th>

                    <th>Status</th>

                </tr>

                </thead>

                <tbody>

                {

                    applications.map(app=>(

                        <tr

                            key={app.applicationId}

                        >

                            <td>

                                {app.applicationId}

                            </td>

                            <td>

                                {app.title}

                            </td>

                            <td>

                                {app.company}

                            </td>

                            <td>

                                {app.location}

                            </td>

                            <td>

                                <span

                                    className={`status-badge ${app.status.toLowerCase()}`}

                                >

                                    {app.status}

                                </span>

                            </td>

                        </tr>

                    ))

                }

                </tbody>

            </table>

        </div>

    );

}