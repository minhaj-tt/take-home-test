import { useEffect, useState } from "react";
import { gapi } from "gapi-script";

export const FileList = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchFiles = async () => {
        setLoading(true);
        try {
            await gapi.client.load("drive", "v3");
            const response = await gapi.client.drive.files.list({
                pageSize: 10,
                fields: "files(id, name)",
            });
            console.log("response", response);
            setFiles(response.result.files || []);
        } catch (error) {
            console.error("Error fetching files:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteFile = async (fileId) => {
        try {
            await gapi.client.drive.files.delete({
                fileId,
            });

            alert("File deleted successfully!");
            fetchFiles();
        } catch (error) {
            console.error("Error deleting file: ", error);
            alert("Failed to delete file.");
        }
    };

    const downloadFile = async (fileId, fileName) => {
        try {
            const response = await gapi.client.drive.files.get({
                fileId: fileId,
                alt: "media",
            });

            const fileContent = response.body;

            const blob = new Blob([fileContent], { type: "application/octet-stream" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName || "download";
            document.body.appendChild(a);
            a.click();

            URL.revokeObjectURL(url);
            alert("File downloaded successfully!");
        } catch (error) {
            console.error("Error downloading file: ", error);
            alert("Failed to download file.");
        }
    };

    useEffect(() => {
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
            fetchFiles();
        }
    }, []);

    return (
        <div>
            <h2>My Google Drive Files</h2>
            {loading ? (
                <p>Loading files...</p>
            ) :
                files.length === 0 ? (
                    <p>No files found.</p>
                ) : (
                    <ul>
                        {files.map((file) => (
                            <li key={file.id}>
                                {file.name}
                                <button
                                    style={{ marginLeft: 20 }}
                                    onClick={() => deleteFile(file.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    style={{ marginLeft: 20 }}
                                    onClick={() => downloadFile(file.id, file.name)}
                                >
                                    Download
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
        </div>
    );
};
