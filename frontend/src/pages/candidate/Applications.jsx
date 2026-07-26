import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFileAlt } from "react-icons/fa";
import "./Applications.css";

import CandidateLayout from "../../layouts/CandidateLayout";
import PageLoader from "../../components/common/PageLoader";

import { useAuth } from "../../context/AuthContext";

import {
    getUserApplicationDetails
} from "../../services/applicationService";

export default function Applications() {

    const { user } = useAuth();

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

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

        finally {

            setLoading(false);

        }

    }

    if (loading) {
        return (
            <CandidateLayout>
                <PageLoader />
            </CandidateLayout>
        );
    }

    if(applications.length===0){

        return(

            <CandidateLayout>

            <div className="applications-page empty-applications">

                <button
                    className="btn btn-outline"
                    onClick={() => navigate("/candidate/home")}
                >
                    <FaArrowLeft /> Back to Home
                </button>

                <h1>
                    <FaFileAlt />
                </h1>

                <h3>

                    You haven't applied for any jobs yet.

                </h3>

                <button

                    className="btn btn-primary"

                    onClick={()=>navigate("/candidate/home")}

                >

                    Go to Jobs

                </button>

            </div>

            </CandidateLayout>

        );

    }

    return (

        <CandidateLayout>

        <div className="applications-page">

            <button
                className="btn btn-outline"
                onClick={() => navigate("/candidate/home")}
            >
                <FaArrowLeft /> Back to Home
            </button>

            <h2>

                My Applications

            </h2>

            <div className="applications-table-wrap">

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

        </div>

        </CandidateLayout>

    );

}