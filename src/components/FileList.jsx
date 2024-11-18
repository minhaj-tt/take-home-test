/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import {
    Box,
    Typography,
    Paper,
    Table,
    TableRow,
    TableContainer,
    TableCell,
    TableBody,
} from "@mui/material";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const FileList = ({ token }) => {
    // State to store list of files and loading state
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to fetch files from Google Drive
    const fetchFiles = async () => {
        setLoading(true);
        try {
            // Load the Drive API v3
            await gapi.client.load("drive", "v3");

            // Make the API call to list files (only fetching ID and name)
            const response = await gapi.client.drive.files.list({
                pageSize: 10,
                fields: "files(id, name)",
            });

            // Set the files state with the fetched files
            setFiles(response.result.files || []);
        } catch (error) {
            console.error("Error fetching files:", error);
        } finally {
            setLoading(false); // Set loading to false once files are fetched
        }
    };

    // Function to delete a file from Google Drive
    const deleteFile = async (fileId) => {
        try {
            // Delete the file by its ID using the Google Drive API
            await gapi.client.drive.files.delete({
                fileId,
            });

            // Alert the user and refresh the file list
            alert("File deleted successfully!");
            fetchFiles(); // Re-fetch the file list after deletion
        } catch (error) {
            console.error("Error deleting file: ", error);
            alert("Failed to delete file.");
        }
    };

    // Function to download a file from Google Drive
    const downloadFile = async (fileId, fileName) => {
        try {
            // Make the API call to get the file content
            const response = await gapi.client.drive.files.get({
                fileId: fileId,
                alt: "media",
            });

            const fileContent = response.body;

            // Create a Blob from the file content
            const blob = new Blob([fileContent], {
                type: "application/octet-stream",
            });

            // Create a URL for the blob and initiate the download
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName || "download";
            document.body.appendChild(a);
            a.click();

            // Revoke the object URL after the download
            URL.revokeObjectURL(url);
            alert("File downloaded successfully!");
        } catch (error) {
            console.error("Error downloading file: ", error);
            alert("Failed to download file.");
        }
    };

    useEffect(() => {
        if (token) {
            fetchFiles();
        }
    }, [token]);

    return (
        <>
            {loading ? (
                <p>Loading files...</p>
            ) : files.length === 0 ? (
                <p>No files found.</p>
            ) : (
                <TableContainer component={Paper} sx={{ mt: "20px" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            {files?.map((file, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        "&:first-child td, &:first-child th,  &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        <Typography
                                            sx={{ color: "text.primary", display: "inline" }}
                                        >
                                            {file.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <Typography
                                                variant="button"
                                                component="span"
                                                sx={{
                                                    fontSize: "12px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    p: "5px",
                                                    gap: "5px",
                                                    ":hover": {
                                                        backgroundColor: "#dbdbdb",
                                                        cursor: "pointer",
                                                        borderRadius: "5px",
                                                    },
                                                }}
                                                onClick={() => downloadFile(file.id, file.name)}
                                            >
                                                <SystemUpdateAltIcon />
                                                <span>Download file</span>
                                            </Typography>
                                            <Typography
                                                variant="button"
                                                component="span"
                                                sx={{
                                                    fontSize: "12px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    gap: "5px",
                                                    p: "1px 5px",
                                                    ":hover": {
                                                        backgroundColor: "#dbdbdb",
                                                        cursor: "pointer",
                                                        borderRadius: "5px",
                                                    },
                                                }}
                                                onClick={() => deleteFile(file.id)}
                                            >
                                                <DeleteForeverIcon />
                                                <span>Delete file</span>
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};
