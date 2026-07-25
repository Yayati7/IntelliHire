import { useEffect, useState } from "react";
import { getDashboard } from "../../services/analyticsService";
import DeveloperLayout from "../../layouts/DeveloperLayout";
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
                <div className="developer-loading">
                    Loading Dashboard...
                </div>
            </DeveloperLayout>
        );

    }

    if (error || !dashboard) {

        return (
            <DeveloperLayout>
                <div className="developer-dashboard">
                    <h1>IntelliHire Developer Dashboard</h1>
                    <p className="subtitle">
                        Could not load analytics. Make sure analytics-service is
                        running and reachable.
                    </p>
                    <button onClick={loadDashboard}>Retry</button>
                </div>
            </DeveloperLayout>
        );

    }

    return (

        <DeveloperLayout>

            <div className="developer-dashboard">

                <h1>
                    IntelliHire Developer Dashboard
                </h1>

                <p className="subtitle">
                    Real-time Platform Analytics
                </p>

                <div className="dashboard-grid">

                    <DashboardCard
                        title="Total Users"
                        value={dashboard.totalUsers ?? 0}
                        color="blue"
                    />

                    <DashboardCard
                        title="Jobs Posted"
                        value={dashboard.totalJobs ?? 0}
                        color="green"
                    />

                    <DashboardCard
                        title="Applications"
                        value={dashboard.totalApplications ?? 0}
                        color="orange"
                    />

                    <DashboardCard
                        title="Total Events"
                        value={dashboard.totalEvents ?? 0}
                        color="purple"
                    />

                    <DashboardCard
                        title="Recommendations"
                        value={dashboard.recommendationEvents ?? 0}
                        color="pink"
                    />

                    <DashboardCard
                        title="Resume Uploads"
                        value={dashboard.resumeUploads ?? 0}
                        color="cyan"
                    />

                    <DashboardCard
                        title="Applications Logged"
                        value={dashboard.jobApplications ?? 0}
                        color="gold"
                    />

                    <DashboardCard
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

    title,

    value,

    color

}) {

    return (

        <div className={`dashboard-card ${color}`}>

            <h2>
                {value}
            </h2>

            <p>
                {title}
            </p>

        </div>

    );

}