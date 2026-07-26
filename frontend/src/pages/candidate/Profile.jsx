import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import "./Profile.css";

import CandidateLayout from "../../layouts/CandidateLayout";
import { useAuth } from "../../context/AuthContext";
import { getUser, saveUserProfile } from "../../services/userService";

export default function Profile() {

    const { user } = useAuth();

    const navigate = useNavigate();

    const userId = user?.userId;

    const [profile, setProfile] = useState({

        name: user?.name || "",

        email: user?.email || "",

        location: "",

        summary: ""

    });

    const [resume, setResume] = useState(null);

    const [saving, setSaving] = useState(false);

    useEffect(() => {

        if(userId){

            loadProfile();

            loadResume();

        }

    }, [userId]);

    async function loadProfile() {

        try {

            const res = await getUser(userId);

            setProfile({
                name: res.name || user?.name || "",
                email: res.email || user?.email || "",
                location: res.location || "",
                summary: res.summary || ""
            });

        }

        catch (e) {

            // No profile saved yet — prefill just the known signup details,
            // leave the rest blank until the user fills and saves.
            setProfile(prev => ({
                ...prev,
                name: user?.name || "",
                email: user?.email || ""
            }));

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

        setSaving(true);

        try {

            await saveUserProfile(userId, {

                name: profile.name,

                email: profile.email,

                location: profile.location,

                summary: profile.summary

            });

            toast.success("Profile Updated");

        }

        catch (e) {

            console.log(e);

            toast.error(e?.response?.data?.message || "Could not save profile.");

        }

        finally {

            setSaving(false);

        }

    }

    function updateField(e){

        setProfile({

            ...profile,

            [e.target.name]:e.target.value

        });

    }

    return (

        <CandidateLayout>

        <div className="profile-page">

            <button
                className="btn btn-outline"
                onClick={() => navigate("/candidate/home")}
            >
                <FaArrowLeft /> Back to Home
            </button>

            <h2>My Profile</h2>

            <div className="profile-grid-layout">

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

                        placeholder="Not set yet"

                    />

                    <label>Summary</label>

                    <textarea

                        rows="5"

                        name="summary"

                        value={profile.summary}

                        onChange={updateField}

                        placeholder="Not set yet"

                    />

                    <button

                        className="btn btn-primary"

                        onClick={saveProfile}

                        disabled={saving}

                    >

                        {saving ? "Saving..." : "Save Changes"}

                    </button>

                </div>

                <div className="resume-card">

                    <h3>Resume</h3>

                    {

                        resume ?

                        <>

                            <p>

                                <b>File:</b>

                                {resume.fileName}

                            </p>

                            <p>

                                <b>Uploaded:</b>

                                {resume.uploadedAt}

                            </p>

                            <p>

                                <b>Updated:</b>

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

        </div>

        </CandidateLayout>

    );

}