/* eslint-disable react/prop-types */
import { gapi } from "gapi-script";

export const FileUploader = ({ fetchFiles }) => {
    const uploadFile = async (event) => {
        const file = event.target.files[0];
        const metadata = {
            name: file.name,
            mimeType: file.type,
        };

        const formData = new FormData();
        formData.append(
            "metadata",
            new Blob([JSON.stringify(metadata)], { type: "application/json" })
        );
        formData.append("file", file);

        const accessToken = gapi.auth.getToken().access_token;

        try {
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
            fetchFiles();
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file. Please check your authentication scopes.");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column', }}>
            <input type="file" onChange={uploadFile} />
        </div>
    );
};
