import CompanyLayout from "../../layouts/CompanyLayout";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./CompanyProfile.css";

export default function CompanyProfile() {

    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <CompanyLayout>
            <div className="company-profile-card">
                <h2>Company Account</h2>
                <p><b>Name:</b> {user?.name}</p>
                <p><b>Email:</b> {user?.email}</p>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/company/home")}
                >
                    Back to Dashboard
                </button>
            </div>
        </CompanyLayout>
    );
}