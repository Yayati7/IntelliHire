import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { saveUserProfile } from "../../services/userService";

const ROLE_LABEL = { USER: "Candidate", RECRUITER: "Company", ADMIN: "Developer" };

function LoginSuccess() {

    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {

        async function run() {

            const error = params.get("error");

            if (error === "access_denied") {
                alert("Access Denied. This Google account is not authorized for Developer access.");
                navigate("/login?role=ADMIN", { replace: true });
                return;
            }

            if (error === "role_mismatch") {
                const actualRole = params.get("actualRole");
                const label = ROLE_LABEL[actualRole] || actualRole;
                alert(`This account already exists as a ${label}. Please log in through the ${label} portal.`);
                navigate(`/login?role=${actualRole}`, { replace: true });
                return;
            }

            const accessToken = params.get("accessToken");
            const refreshToken = params.get("refreshToken");
            const userId = params.get("userId");
            const name = params.get("name");
            const email = params.get("email");
            const role = params.get("role");

            if (!accessToken || !role) {
                navigate("/login", { replace: true });
                return;
            }

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            const authData = {
                accessToken,
                refreshToken,
                userId: Number(userId),
                name,
                email,
                role
            };

            login(authData);

            try {

                await saveUserProfile(Number(userId), {
                    name: name || "User",
                    email: email
                });

            } catch (e) {

                console.log("Profile pre-create skipped:", e);

            }

            if (role === "USER") {
                navigate("/candidate/home", { replace: true });
            } else if (role === "RECRUITER") {
                navigate("/company/home", { replace: true });
            } else if (role === "ADMIN") {
                if (email !== "yayatimannsingh7@gmail.com") {
                    alert("Access Denied");
                    navigate("/login", { replace: true });
                    return;
                }
                navigate("/developer", { replace: true });
            } else {
                navigate("/login", { replace: true });
            }

        }

        run();

    }, []);

    return <h1>Signing you in...</h1>;
}

export default LoginSuccess;