import {

    Routes,

    Route,

    Navigate

} from "react-router-dom";

import Landing from "../pages/landing/Landing";

import Login from "../pages/auth/Login";

import LoginSuccess from "../pages/auth/LoginSuccess";

import CandidateHome from "../pages/candidate/CandidateHome";

import CompanyDashboard from "../pages/company/CompanyDashboard";

import DeveloperDashboard from "../pages/developer/DeveloperDashboard";

import Applications from "../pages/candidate/Applications";
import Profile from "../pages/candidate/Profile";

import PostJob from "../pages/company/PostJob";

import MyJobs from "../pages/company/MyJobs";

import EditJob from "../pages/company/EditJob";

import Applicants from "../pages/company/Applicants";

import ProtectedRoute from "../components/ProtectedRoute";



export default function AppRoutes(){

    return(

        <Routes>

            <Route

                path="/"

                element={<Landing/>}

            />

            <Route

                path="/login"

                element={<Login/>}

            />

            <Route

                path="/login-success"

                element={<LoginSuccess/>}

            />

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

            <Route

                path="/company/home"

                element={

                <ProtectedRoute role="RECRUITER">

                <CompanyDashboard/>

                </ProtectedRoute>

                }
            />

            <Route

                path="/company/post"

                element={

                <ProtectedRoute role="RECRUITER">

                <PostJob/>

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

                path="/company/applicants/:jobId"

                element={

                <ProtectedRoute role="RECRUITER">

                <Applicants/>

                </ProtectedRoute>

                }
            />

            <Route

                path="/developer"

                element={
                <ProtectedRoute role="ADMIN">
                <DeveloperDashboard/>
                </ProtectedRoute>
                }

            />

            <Route

                path="*"

                element={<Navigate to="/"/>}

            />

            <Route

                path="/candidate/applications"

                element={<Applications/>}

            />

            <Route

                path="/candidate/profile"

                element={<Profile/>}

            />

            <Route

                path="/company"

                element={<CompanyDashboard/>}

            />

            <Route

                path="/company/post-job"

                element={<PostJob/>}

            />

            <Route

                path="/company/jobs"

                element={<MyJobs/>}

            />

            <Route

                path="/company/edit/:id"

                element={<EditJob/>}

            />

            <Route

                path="/company/applicants/:jobId"

                element={<Applicants/>}

            />

            <Route

                path="/developer"

                element={<DeveloperDashboard/>}

            />

            <Route

                path="/company/home"

                element={<CompanyDashboard/>}

            />

            <Route

                path="/company/post"

                element={<PostJob/>}

            />

            <Route

                path="/company/edit/:id"

                element={<EditJob/>}

            />

        </Routes>



    );

}