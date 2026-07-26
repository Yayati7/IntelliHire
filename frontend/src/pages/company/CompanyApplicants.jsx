import { useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import CompanyLayout from "../../layouts/CompanyLayout";
import PageLoader from "../../components/common/PageLoader";
import { useAuth } from "../../context/AuthContext";
import { useConfirm } from "../../context/ConfirmContext";
import { getRecruiterJobs } from "../../services/jobService";
import {
    getApplicantDetails,
    approveApplication,
    rejectApplication
} from "../../services/applicationService";
import "./Applicants.css";

export default function CompanyApplicants() {

    const { user } = useAuth();
    const confirm = useConfirm();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) load();
    }, [user]);

    async function load() {
        try {
            const jobs = await getRecruiterJobs(user.userId);

            const all = await Promise.all(
                jobs.map(async (job) => {
                    try {
                        const applicants = await getApplicantDetails(job.id);

                        return applicants.map(a => ({
                            ...a,
                            jobTitle: job.title
                        }));
                    } catch (e) {
                        return [];
                    }
                })
            );

            setRows(all.flat());
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    async function approve(id) {
        const ok = await confirm("Approve this candidate for the next round?", {
            title: "Approve Candidate",
            confirmText: "Approve"
        });
        if (!ok) return;

        await approveApplication(id);

        setRows(
            rows.map(r =>
                r.applicationId === id
                    ? { ...r, status: "NEXT_ROUND" }
                    : r
            )
        );
    }

    async function reject(id) {
        const ok = await confirm("Reject this candidate's application?", {
            title: "Reject Candidate",
            confirmText: "Reject",
            danger: true
        });
        if (!ok) return;

        await rejectApplication(id);

        setRows(
            rows.map(r =>
                r.applicationId === id
                    ? { ...r, status: "REJECTED" }
                    : r
            )
        );
    }

    if (loading) {
        return (
            <CompanyLayout>
                <PageLoader />
            </CompanyLayout>
        );
    }

    return (
        <CompanyLayout>
            <div className="applicants-page">

                <h2>All Applicants</h2>

                {rows.length === 0 && (
                    <p className="applicants-empty">No applicants yet.</p>
                )}

                {rows.map(app => (
                    <div
                        key={app.applicationId}
                        className="applicant-card"
                    >
                        <h3>
                            {app.candidateName} — applied for {app.jobTitle}
                        </h3>

                        <p>
                            <b>Email:</b> {app.email}
                        </p>

                        {
                            app.resumeFileName && (
                                <a
                                    href={`http://localhost:8082/resume/download/${app.userId}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaFileAlt /> View Resume
                                </a>
                            )
                        }

                        <p>
                            <b>Status:</b> {app.status}
                        </p>

                        <div className="applicant-actions">

                            <button
                                onClick={() => approve(app.applicationId)}
                                disabled={app.status === "NEXT_ROUND"}
                            >
                                Approve
                            </button>

                            <button
                                onClick={() => reject(app.applicationId)}
                                disabled={app.status === "REJECTED"}
                            >
                                Reject
                            </button>

                        </div>
                    </div>
                ))}

            </div>
        </CompanyLayout>
    );
}