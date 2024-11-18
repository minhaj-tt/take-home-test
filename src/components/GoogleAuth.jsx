/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useGoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const clientId = "850985874251-4dlu8d73klll3digohjvfn7m8nnlh0r3.apps.googleusercontent.com";

export const GoogleAuth = ({ setToken }) => {
    useEffect(() => {
        function initClient() {
            gapi.load("client:auth2", () => {
                gapi.auth2.init({
                    clientId,
                    scope: "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive",
                });
            });
        }
        initClient();

        const savedToken = localStorage.getItem("googleToken");
        if (savedToken) {
            setToken(savedToken);
        }
    }, [setToken]);

    const onSuccess = (response) => {
        const token = response.tokenId;
        localStorage.setItem("googleToken", token);
        setToken(token);
    };

    const onFailure = (error) => {
        console.error("Login failed:", error);
    };

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
    });

    return (
        <div>
            <button onClick={signIn}>Login with Google</button>
        </div>
    );
};
