import { useEffect, useState } from "react";
import { getDashboard } from "../../services/analyticsService";
import DeveloperLayout from "../../layouts/DeveloperLayout";
import PageLoader from "../../components/common/PageLoader";
import {
    FaUsers,
    FaBriefcase,
    FaClipboardList,
    FaChartLine,
    FaBrain,
    FaFileUpload,
    FaCheckCircle,
    FaPlusSquare,
    FaExclamationTriangle
} from "react-icons/fa";
import "./DeveloperDashboard.css";

export default function DeveloperDashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const data = await getDashboard();

            setDashboard(data);
            setError(false);

        }

        catch (e) {

            console.log(e);
            setError(true);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (
            <DeveloperLayout>
                <PageLoader />
            </DeveloperLayout>
        );

    }

    if (error || !dashboard) {

        return (
            <DeveloperLayout>
                <div className="developer-dashboard">
                    <h1>IntelliHire Developer Dashboard</h1>
                    <div className="developer-error">
                        <FaExclamationTriangle />
                        <p>
                            Could not load analytics. Make sure analytics-service is
                            running and reachable.
                        </p>
                        <button className="btn btn-primary" onClick={loadDashboard}>Retry</button>
                    </div>
                </div>
            </DeveloperLayout>
        );

    }

    return (

        <DeveloperLayout>

            <div className="developer-dashboard">

                <div>
                    <h1>
                        IntelliHire Developer Dashboard
                    </h1>

                    <p className="subtitle">
                        Real-time Platform Analytics
                    </p>
                </div>

                <div className="dashboard-grid">

                    <DashboardCard
                        icon={<FaUsers />}
                        title="Total Users"
                        value={dashboard.totalUsers ?? 0}
                        color="blue"
                    />

                    <DashboardCard
                        icon={<FaBriefcase />}
                        title="Jobs Posted"
                        value={dashboard.totalJobs ?? 0}
                        color="green"
                    />

                    <DashboardCard
                        icon={<FaClipboardList />}
                        title="Applications"
                        value={dashboard.totalApplications ?? 0}
                        color="orange"
                    />

                    <DashboardCard
                        icon={<FaChartLine />}
                        title="Total Events"
                        value={dashboard.totalEvents ?? 0}
                        color="purple"
                    />

                    <DashboardCard
                        icon={<FaBrain />}
                        title="Recommendations"
                        value={dashboard.recommendationEvents ?? 0}
                        color="pink"
                    />

                    <DashboardCard
                        icon={<FaFileUpload />}
                        title="Resume Uploads"
                        value={dashboard.resumeUploads ?? 0}
                        color="cyan"
                    />

                    <DashboardCard
                        icon={<FaCheckCircle />}
                        title="Applications Logged"
                        value={dashboard.jobApplications ?? 0}
                        color="gold"
                    />

                    <DashboardCard
                        icon={<FaPlusSquare />}
                        title="Job Created Events"
                        value={dashboard.jobPosts ?? 0}
                        color="red"
                    />

                </div>

                <div className="analytics-section">

                    <h2>
                        Platform Summary
                    </h2>

                    <table>

                        <tbody>

                        <tr>
                            <td>Total Registered Users</td>
                            <td>{dashboard.totalUsers ?? 0}</td>
                        </tr>

                        <tr>
                            <td>Total Jobs</td>
                            <td>{dashboard.totalJobs ?? 0}</td>
                        </tr>

                        <tr>
                            <td>Total Applications</td>
                            <td>{dashboard.totalApplications ?? 0}</td>
                        </tr>

                        <tr>
                            <td>Total Analytics Events</td>
                            <td>{dashboard.totalEvents ?? 0}</td>
                        </tr>

                        <tr>
                            <td>Resume Upload Events</td>
                            <td>{dashboard.resumeUploads ?? 0}</td>
                        </tr>

                        <tr>
                            <td>Recommendation Events</td>
                            <td>{dashboard.recommendationEvents ?? 0}</td>
                        </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </DeveloperLayout>

    );

}

function DashboardCard({

    icon,

    title,

    value,

    color

}) {

    return (

        <div className={`dashboard-card ${color}`}>

            <div className="dashboard-card-icon">
                {icon}
            </div>

            <div>
                <h2>
                    {value}
                </h2>

                <p>
                    {title}
                </p>
            </div>

        </div>

    );

}