import CompanyLayout from "../../layouts/CompanyLayout";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CompanyProfile() {

    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <CompanyLayout>
            <div style={{ background: "white", padding: 30, borderRadius: 15, maxWidth: 500 }}>
                <h2>Company Account</h2>
                <p><b>Name:</b> {user?.name}</p>
                <p><b>Email:</b> {user?.email}</p>
                <button
                    style={{ marginTop: 20, padding: "10px 20px", cursor: "pointer" }}
                    onClick={() => navigate("/company/home")}
                >
                    Back to Dashboard
                </button>
            </div>
        </CompanyLayout>
    );
}