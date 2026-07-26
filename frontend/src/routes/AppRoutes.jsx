import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Landing from "../pages/landing/Landing";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import LoginSuccess from "../pages/auth/LoginSuccess";

import CandidateHome from "../pages/candidate/CandidateHome";
import Applications from "../pages/candidate/Applications";
import Profile from "../pages/candidate/Profile";

import CompanyDashboard from "../pages/company/CompanyDashboard";
import PostJob from "../pages/company/PostJob";
import MyJobs from "../pages/company/MyJobs";
import EditJob from "../pages/company/EditJob";
import Applicants from "../pages/company/Applicants";
import CompanyApplicants from "../pages/company/CompanyApplicants";
import CompanyProfile from "../pages/company/CompanyProfile";

import DeveloperDashboard from "../pages/developer/DeveloperDashboard";
import ServiceLogs from "../pages/developer/ServiceLogs";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes(){

    return(
        <Routes>

            <Route path="/" element={<Landing/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login-success" element={<LoginSuccess/>} />

            {/* Candidate */}
            <Route
                path="/candidate/home"
                element={
                    <ProtectedRoute role="USER">
                        <CandidateHome/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/candidate/jobs"
                element={
                    <ProtectedRoute role="USER">
                        <CandidateHome/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/candidate/profile"
                element={
                    <ProtectedRoute role="USER">
                        <Profile/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/candidate/applications"
                element={
                    <ProtectedRoute role="USER">
                        <Applications/>
                    </ProtectedRoute>
                }
            />

            {/* Company */}
            <Route
                path="/company/home"
                element={
                    <ProtectedRoute role="RECRUITER">
                        <CompanyDashboard/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/company/post-job"
                element={
                    <ProtectedRoute role="RECRUITER">
                        <PostJob/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/company/jobs"
                element={
                    <ProtectedRoute role="RECRUITER">
                        <MyJobs/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/company/edit/:id"
                element={
                    <ProtectedRoute role="RECRUITER">
                        <EditJob/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/company/applicants"
                element={
                    <ProtectedRoute role="RECRUITER">
                        <CompanyApplicants/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/company/applicants/job/:jobId"
                element={
                    <ProtectedRoute role="RECRUITER">
                        <Applicants/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/company/profile"
                element={
                    <ProtectedRoute role="RECRUITER">
                        <CompanyProfile/>
                    </ProtectedRoute>
                }
            />

            {/* Developer */}
            <Route
                path="/developer"
                element={
                    <ProtectedRoute role="ADMIN">
                        <DeveloperDashboard/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/developer/logs/:serviceId"
                element={
                    <ProtectedRoute role="ADMIN">
                        <ServiceLogs/>
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<Navigate to="/"/>} />

        </Routes>
    );
}