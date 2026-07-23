import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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

            alert("Job Posted Successfully");

            navigate("/company/home");

        }

        catch (e) {

            console.log(e);

            alert("Unable to post job");

        }

    }

    return (

        <div className="post-job">

            <h2>Post New Job</h2>

            <input
                name="title"
                placeholder="Job Title"
                value={job.title}
                onChange={handleChange}
            />

            <input
                name="company"
                placeholder="Company"
                value={job.company}
                onChange={handleChange}
            />

            <input
                name="location"
                placeholder="Location"
                value={job.location}
                onChange={handleChange}
            />

            <textarea

                rows="8"

                name="description"

                placeholder="Job Description"

                value={job.description}

                onChange={handleChange}

            />

            <input

                name="skills"

                placeholder="Skills (comma separated)"

                value={job.skills}

                onChange={handleChange}

            />

            <button

                onClick={createJob}

            >

                Post Job

            </button>

        </div>

    );

}