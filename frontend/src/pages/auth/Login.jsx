import axios from "axios";
import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { login } = useAuth();

    const [search] = useSearchParams();

    const role = search.get("role");

    async function normalLogin() {

        const res = await axios.post(

            "http://localhost:8081/auth/login",

            {

                email,

                password

            }

        );

        localStorage.setItem(

            "accessToken",

            res.data.accessToken

        );

        localStorage.setItem(

            "refreshToken",

            res.data.refreshToken

        );

        login(

            res.data

        );

        if (

            res.data.role === "USER"

        ) {

            navigate(

                "/candidate/home"

            );

        }

        if (

            res.data.role === "RECRUITER"

        ) {

            navigate(

                "/company/home"

            );

        }

        if (

            res.data.role === "ADMIN"

        ) {

            if (

                res.data.email !==

                "yayatimannsingh7@gmail.com"

            ) {

                alert(

                    "Access Denied"

                );

                return;

            }

            navigate(

                "/developer"

            );

        }

        alert(

            "Login Success"

        );

    }

    return (

        <div>

            <h1>

                IntelliHire Login

            </h1>

            {

                role &&

                <p>

                    Logging in as <b>{role}</b>

                </p>

            }

            <input

                placeholder="email"

                onChange={

                    e => setEmail(

                        e.target.value

                    )

                }

            />

            <br />

            <input

                placeholder="password"

                type="password"

                onChange={

                    e => setPassword(

                        e.target.value

                    )

                }

            />

            <br />

            <button

                onClick={

                    normalLogin

                }

            >

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