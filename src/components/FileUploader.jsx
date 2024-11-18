/* eslint-disable react/prop-types */
import { gapi } from "gapi-script";
import { useState } from "react";

export const FileUploader = ({ fetchFiles }) => {
    // State to track the loading state
    const [isLoading, setIsLoading] = useState(false);

    // Handle file upload
    const uploadFile = async (event) => {
        // Get the file selected by the user
        const file = event.target.files[0];

        // Metadata for the file to be uploaded (file name and type)
        const metadata = {
            name: file.name,
            mimeType: file.type,
        };

        // Prepare the FormData object which will contain the file and metadata
        const formData = new FormData();
        formData.append(
            "metadata", // Key for metadata
            new Blob([JSON.stringify(metadata)], { type: "application/json" }) // Convert metadata to JSON and append
        );
        formData.append("file", file); // Append the actual file

        // Get the access token for authentication
        const accessToken = gapi.auth.getToken().access_token;

        setIsLoading(true);

        try {
            // Make the API call to upload the file to Google Drive
            await fetch(
                "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: formData,
                }
            );
            alert("File uploaded successfully!");
            fetchFiles()
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file. Please check your authentication scopes.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20px",
            }}
        >
            <input
                type="file"
                onChange={uploadFile}
                id="file-upload"
                style={{
                    display: "none",
                }}
            />
            <label
                htmlFor="file-upload"
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    cursor: "pointer",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    transition: "background-color 0.3s ease",
                }}
            >
                Upload File
            </label>

            {isLoading && (
                <div
                    style={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            border: "4px solid #f3f3f3",
                            borderTop: "4px solid #3498db",
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            animation: "spin 2s linear infinite",
                        }}
                    ></div>
                </div>
            )}
        </div>
    );
};
