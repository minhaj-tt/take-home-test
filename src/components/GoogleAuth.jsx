/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useGoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

export const GoogleAuth = ({ setToken }) => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    function initClient() {
      gapi.load("client:auth2", () => {
        gapi.auth2.init({
          clientId,
          scope:
            "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive",
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
    <Button
      sx={{
        backgroundColor: "#4285F4",
        color: "#FFFFFF",
        textTransform: "none",
        fontSize: "14px",
        padding: "10px 24px",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          backgroundColor: "#357AE8",
        },
      }}
      startIcon={
        <GoogleIcon
          sx={{
            marginRight: "8px",
          }}
        />
      }
      onClick={signIn}
    >
      Login with Google
    </Button>
  );
};
