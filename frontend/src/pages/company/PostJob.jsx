import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import CompanyLayout from "../../layouts/CompanyLayout";
import "./PostJob.css";

export default function PostJob() {

    const navigate = useNavigate();

    const { user } = useAuth();

    const [job, setJob] = useState({

        title: "",

        company: "",

        location: "",

        description: "",

        skills: ""

    });

    function handleChange(e) {

        setJob({

            ...job,

            [e.target.name]: e.target.value

        });

    }

    async function createJob() {

        try {

            await axios.post(

                "http://localhost:8083/job",

                {

                    ...job,

                    recruiterId: user.userId

                }

            );

            toast.success("Job Posted Successfully");

            navigate("/company/home");

        }

        catch (e) {

            console.log(e);

            const message = e?.response?.data?.message || "Unable to post job";

            toast.error(message);

        }

    }

    return (

        <CompanyLayout>

            <div className="post-job">

                <h2>Post New Job</h2>

                <div className="form-field">
                    <label>Job Title</label>
                    <input
                        name="title"
                        placeholder="e.g. Senior Backend Engineer"
                        value={job.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field">
                    <label>Company</label>
                    <input
                        name="company"
                        placeholder="Company name"
                        value={job.company}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field">
                    <label>Location</label>
                    <input
                        name="location"
                        placeholder="e.g. Bangalore, Remote"
                        value={job.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field">
                    <label>Job Description</label>
                    <textarea
                        rows="8"
                        name="description"
                        placeholder="Describe the role, responsibilities and requirements"
                        value={job.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field">
                    <label>Skills</label>
                    <input
                        name="skills"
                        placeholder="Comma separated, e.g. Java, Spring Boot, AWS"
                        value={job.skills}
                        onChange={handleChange}
                    />
                </div>

                <button className="btn btn-primary" onClick={createJob}>
                    Post Job
                </button>

            </div>

        </CompanyLayout>

    );

}