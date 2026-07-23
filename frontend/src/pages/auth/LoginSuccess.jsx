import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function LoginSuccess() {
    const [params] = useSearchParams();

    useEffect(() => {
        let token = params.get("token");

        localStorage.setItem(
            "token",
            token
        );

    }, []);

    return (
        <h1>
            Google Login Successful
        </h1>
    );
}

export default LoginSuccess;