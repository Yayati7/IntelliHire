import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaUsers, FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useConfirm } from "../../context/ConfirmContext";
import CompanyLayout from "../../layouts/CompanyLayout";

import {

    getRecruiterJobs,

    deleteJob

}

from "../../services/jobService";

import "./CompanyDashboard.css";

export default function CompanyDashboard() {

    const { user } = useAuth();
    const confirm = useConfirm();

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

        const ok = await confirm("Delete this job? This action cannot be undone.", {
            title: "Delete Job",
            confirmText: "Delete",
            danger: true
        });

        if (!ok) return;

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

                    <Link to="/company/post-job">
                        <button className="btn btn-primary">
                            <FaPlus /> Post Job
                        </button>
                    </Link>

                </div>

                <div className="company-jobs-grid">

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

                                <b>Company:</b> {job.company}

                            </p>

                            <p>

                                <b>Location:</b> {job.location}

                            </p>

                            <p>

                                {job.description}

                            </p>

                            <div className="company-actions">

                                <Link to={`/company/applicants/job/${job.id}`}>
                                    <button><FaUsers /> Applicants</button>
                                </Link>

                                <Link to={`/company/edit/${job.id}`}>
                                    <button><FaEdit /> Edit</button>
                                </Link>

                                <button onClick={() => removeJob(job.id)}>
                                    <FaTrash /> Delete
                                </button>

                            </div>

                        </div>

                    ))

                }

                </div>

            </div>

        </CompanyLayout>

    );

}