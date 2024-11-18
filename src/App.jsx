import { useState, useEffect } from "react";
import { GoogleAuth } from "./components/GoogleAuth";
import { FileList } from "./components/FileList";
import { FileUploader } from "./components/FileUploader";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("googleToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        margin: "auto",
        alignItems: "center",
      }}
    >
      <h1>Google Drive Integration</h1>
      {!token ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GoogleAuth setToken={setToken} />
        </div>
      ) : (
        <div>
          <FileUploader token={token} fetchFiles={setToken} />
          <FileList token={token} />
        </div>
      )}
    </div>
  );
};

export default App;
