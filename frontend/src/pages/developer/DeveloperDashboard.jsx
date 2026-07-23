import { useEffect, useState } from "react";
import { getDashboard } from "../../services/analyticsService";
import "./DeveloperDashboard.css";

export default function DeveloperDashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const data = await getDashboard();

            setDashboard(data);

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

            <div className="developer-loading">

                Loading Dashboard...

            </div>

        );

    }

    return (

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
                    value={dashboard.totalUsers}
                    color="blue"
                />

                <DashboardCard
                    title="Jobs Posted"
                    value={dashboard.totalJobs}
                    color="green"
                />

                <DashboardCard
                    title="Applications"
                    value={dashboard.totalApplications}
                    color="orange"
                />

                <DashboardCard
                    title="Total Events"
                    value={dashboard.totalEvents}
                    color="purple"
                />

                <DashboardCard
                    title="Recommendations"
                    value={dashboard.recommendationEvents}
                    color="pink"
                />

                <DashboardCard
                    title="Resume Uploads"
                    value={dashboard.resumeUploads}
                    color="cyan"
                />

                <DashboardCard
                    title="Applications Logged"
                    value={dashboard.jobApplications}
                    color="gold"
                />

                <DashboardCard
                    title="Job Created Events"
                    value={dashboard.jobPosts}
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

                        <td>{dashboard.totalUsers}</td>

                    </tr>

                    <tr>

                        <td>Total Jobs</td>

                        <td>{dashboard.totalJobs}</td>

                    </tr>

                    <tr>

                        <td>Total Applications</td>

                        <td>{dashboard.totalApplications}</td>

                    </tr>

                    <tr>

                        <td>Total Analytics Events</td>

                        <td>{dashboard.totalEvents}</td>

                    </tr>

                    <tr>

                        <td>Resume Upload Events</td>

                        <td>{dashboard.resumeUploads}</td>

                    </tr>

                    <tr>

                        <td>Recommendation Events</td>

                        <td>{dashboard.recommendationEvents}</td>

                    </tr>

                    </tbody>

                </table>

            </div>

        </div>

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