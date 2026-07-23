import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

import { useAuth } from "../../context/AuthContext";

export default function Profile() {

    const { user } = useAuth();

    const userId = user?.userId;

    const [profile, setProfile] = useState({

        name: "",

        email: "",

        location: "",

        summary: ""

    });

    const [resume, setResume] = useState(null);

    useEffect(() => {

        if(userId){

            loadProfile();

            loadResume();

        }

    }, [userId]);

    async function loadProfile() {

        try {

            const res = await axios.get(

                `http://localhost:8082/user/${userId}`

            );

            setProfile(res.data);

        }

        catch (e) {

            console.log(e);

        }

    }

    async function loadResume() {

        try {

            const res = await axios.get(

                `http://localhost:8082/resume/user/${userId}`

            );

            setResume(res.data);

        }

        catch (e) {

            console.log(e);

        }

    }

    async function saveProfile() {

        try {

            await axios.put(

                `http://localhost:8082/user/${userId}`,

                {

                    name: profile.name,

                    location: profile.location,

                    summary: profile.summary

                }

            );

            alert("Profile Updated");

        }

        catch (e) {

            console.log(e);

        }

    }

    function updateField(e){

        setProfile({

            ...profile,

            [e.target.name]:e.target.value

        });

    }

    return (

        <div className="profile-page">

            <h2>My Profile</h2>

            <div className="profile-card">

                <label>Name</label>

                <input

                    name="name"

                    value={profile.name}

                    onChange={updateField}

                />

                <label>Email</label>

                <input

                    value={profile.email}

                    disabled

                />

                <label>Location</label>

                <input

                    name="location"

                    value={profile.location}

                    onChange={updateField}

                />

                <label>Summary</label>

                <textarea

                    rows="5"

                    name="summary"

                    value={profile.summary}

                    onChange={updateField}

                />

                <button

                    onClick={saveProfile}

                >

                    Save Changes

                </button>

            </div>

            <div className="resume-card">

                <h3>Resume</h3>

                {

                    resume ?

                    <>

                        <p>

                            <b>File :</b>

                            {resume.fileName}

                        </p>

                        <p>

                            <b>Uploaded :</b>

                            {resume.uploadedAt}

                        </p>

                        <p>

                            <b>Updated :</b>

                            {resume.updatedAt}

                        </p>

                    </>

                    :

                    <p>

                        Resume not uploaded.

                    </p>

                }

            </div>

        </div>

    );

}