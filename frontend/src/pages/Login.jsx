import axios from "axios";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function normalLogin() {
        const res = await axios.post(
            "http://localhost:8081/auth/login",
            {
                email,
                password
            }
        );

        localStorage.setItem(
            "token",
            res.data.token
        );

        alert("Login Success");

    }



    return (
        <div>
            <h1>IntelliHire Login</h1>

            <input
                placeholder="email"
                onChange={
                    e => setEmail(e.target.value)
                }
            />
            <br />

            <input
                placeholder="password"
                type="password"
                onChange={
                    e => setPassword(e.target.value)
                }
            />
            <br />

            <button onClick={normalLogin}>
                Login
            </button>

            <hr />

            <button
                onClick={() => {
                    window.location.href =
                        "http://localhost:8081/oauth2/authorization/google";
                }}
            >
                Login With Google
            </button>
        </div>
    );
}

export default Login;