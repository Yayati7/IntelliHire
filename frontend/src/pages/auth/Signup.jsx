import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Signup() {

    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();
    const [search] = useSearchParams();
    const role = search.get("role") || "USER";

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function signup() {
        try {
            await axios.post("http://localhost:8081/auth/signup", {
                ...form,
                role
            });
            alert("Account created. Please log in.");
            navigate(`/login?role=${role}`);
        } catch (e) {
            console.log(e);
            alert("Signup failed. Email may already be in use.");
        }
    }

    return (
        <div>
            <h1>IntelliHire Signup</h1>
            <p>Signing up as <b>{role}</b></p>

            <input placeholder="name" name="name" onChange={handleChange} />
            <br />
            <input placeholder="email" name="email" onChange={handleChange} />
            <br />
            <input placeholder="password" type="password" name="password" onChange={handleChange} />
            <br />
            <button onClick={signup}>Sign Up</button>

            <p>
                Already have an account?{" "}
                <span
                    style={{ color: "#2563eb", cursor: "pointer" }}
                    onClick={() => navigate(`/login?role=${role}`)}
                >
                    Log in
                </span>
            </p>
        </div>
    );
}

export default Signup;