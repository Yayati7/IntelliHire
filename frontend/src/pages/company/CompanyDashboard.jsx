import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CompanyLayout from "../../layouts/CompanyLayout";

import {

    getRecruiterJobs,

    deleteJob

}

from "../../services/jobService";

import "./CompanyDashboard.css";

export default function CompanyDashboard() {

    const { user } = useAuth();

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        if (user) {

            loadJobs();

        }

    }, [user]);

    async function loadJobs() {

        try {

            const jobs = await getRecruiterJobs(

                user.userId

            );

            setJobs(jobs);

        }

        catch (e) {

            console.log(e);

        }

    }

    async function removeJob(id) {

        if (!window.confirm("Delete Job ?"))

            return;

        try {

            await deleteJob(id);

            loadJobs();

        }

        catch (e) {

            console.log(e);

        }

    }

    return (

        <CompanyLayout>

            <div className="company-dashboard">

                <div className="company-top">

                    <h2>My Posted Jobs</h2>

                    <Link

                        to="/company/post-job"

                    >

                        <button>

                            + Post Job

                        </button>

                    </Link>

                </div>

                {

                    jobs.map(job => (

                        <div

                            key={job.id}

                            className="company-job-card"

                        >

                            <h3>

                                {job.title}

                            </h3>

                            <p>

                                <b>Company :</b>

                                {job.company}

                            </p>

                            <p>

                                <b>Location :</b>

                                {job.location}

                            </p>

                            <p>

                                {job.description}

                            </p>

                            <div className="company-actions">

                                <Link

                                    to={`/company/applicants/job/${job.id}`}

                                >

                                    <button>

                                        Applicants

                                    </button>

                                </Link>

                                <Link

                                    to={`/company/edit/${job.id}`}

                                >

                                    <button>

                                        Edit

                                    </button>

                                </Link>

                                <button

                                    onClick={() => removeJob(job.id)}

                                >

                                    Delete

                                </button>

                            </div>

                        </div>

                    ))

                }

            </div>

        </CompanyLayout>

    );

}