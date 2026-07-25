import axios from "axios";
import { useState, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { login, logout, user } = useAuth();
    const [search] = useSearchParams();
    const role = search.get("role");

    const roleLabel = { USER: "Candidate", RECRUITER: "Company", ADMIN: "Developer" };

    useEffect(() => {
        // If a session is still active when this page becomes visible
        // (including via browser back/forward cache), force logout so
        // the forward button can't silently re-enter the app.
        if (user) {
            logout();
        }

        // Remember / restore last attempted role for Google OAuth back/forward
        if (role) {
            sessionStorage.setItem("lastLoginRole", role);
        } else {
            const savedRole = sessionStorage.getItem("lastLoginRole");
            if (savedRole) {
                navigate(`/login?role=${savedRole}`, { replace: true });
            }
        }

        function handlePageShow(event) {
            if (event.persisted && user) {
                logout();
            }
        }

        window.addEventListener("pageshow", handlePageShow);

        return () => window.removeEventListener("pageshow", handlePageShow);
    }, []);

    async function normalLogin() {

        try {
            const res = await axios.post(
                "http://localhost:8081/auth/login",
                { email, password }
            );

            const actualRole = res.data.role;

            if (role && actualRole !== role) {
                alert(
                    `This email is registered as a ${roleLabel[actualRole] || actualRole} account. ` +
                    `Please use the ${roleLabel[actualRole] || actualRole} login option instead.`
                );
                return;
            }

            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);

            login(res.data);

            if (actualRole === "USER") {
                navigate("/candidate/home", { replace: true });
            } else if (actualRole === "RECRUITER") {
                navigate("/company/home", { replace: true });
            } else if (actualRole === "ADMIN") {
                if (res.data.email !== "yayatimannsingh7@gmail.com") {
                    alert("Access Denied");
                    return;
                }
                navigate("/developer", { replace: true });
            }

        } catch (e) {
            const message = e?.response?.data?.message || "Login failed. Please check your credentials.";
            alert(message);
        }
    }

    return (
        <div>
            <h1>IntelliHire Login</h1>

            <button
                style={{ marginBottom: 15, padding: "8px 18px", cursor: "pointer" }}
                onClick={() => navigate("/")}
            >
                ← Home
            </button>

            {role && <p>Logging in as <b>{roleLabel[role] || role}</b></p>}

            {role !== "ADMIN" && (
                <>
                    <input
                        placeholder="email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <br />
                    <input
                        placeholder="password"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <br />
                    <button onClick={normalLogin}>Login</button>
                    <hr />
                </>
            )}

            <button
                onClick={() => {
                    let oauthRole = "USER";
                    if (role === "RECRUITER") oauthRole = "RECRUITER";
                    if (role === "ADMIN") oauthRole = "ADMIN";

                    window.location.href =
                        `http://localhost:8081/oauth2/authorization/google?role=${oauthRole}`;
                }}
            >
                Login With Google
            </button>

            {role !== "ADMIN" && (
                <p>
                    New here?{" "}
                    <span
                        style={{ color: "#2563eb", cursor: "pointer" }}
                        onClick={() => navigate(`/signup?role=${role || "USER"}`)}
                    >
                        Create an account
                    </span>
                </p>
            )}

            {role === "ADMIN" && (
                <p style={{ marginTop: 15, color: "#666" }}>
                    Developer access requires signing in with the authorized Google account.
                </p>
            )}
        </div>
    );
}

export default Login;