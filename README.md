# Google Drive File Manager

This is a simple React application that integrates with Google Drive using OAuth 2.0 for user authentication. The application allows users to perform the following actions on their Google Drive:

- **Authenticate the user using OAuth2.0**
- **List files in the user's Google Drive**
- **Upload a file to the user's Google Drive**
- **Download a file from the user's Google Drive**
- **Delete a file from the user's Google Drive**
- **Sign out of the application**

## Features

### 1. **User Authentication (OAuth2.0)**

- The application uses **Google OAuth 2.0** for user authentication.
- After successful authentication, users can access their Google Drive files and perform actions like upload, download, list, and delete.

### 2. **List Files in Google Drive**

- Once the user is authenticated, the app fetches and displays a list of files from the user's Google Drive.
- If no files are found, the app displays a "No files found" message.

### 3. **Upload Files to Google Drive**

- Users can upload files from their local machine to Google Drive.
- The file is uploaded with its metadata (name and mime type) to Google Drive using the Google Drive API.

### 4. **Download Files from Google Drive**

- Users can download files from their Google Drive to their local machine.
- The file is fetched using its `fileId` and then the content is downloaded to the local machine with the correct file name.

### 5. **Delete Files from Google Drive**

- Users can delete files from their Google Drive.
- After a file is deleted, the file list is updated, and the deleted file no longer appears in the list.

### 6. **Sign Out Functionality**

- Users can sign out of their Google account and the app. This removes the OAuth token and prevents further access to the Google Drive API until re-authenticated.

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Environment Variables

This project uses environment variables to securely store sensitive information like the Google Client ID. To set up the environment variables:

### 1. **Create an `.env` File**

- In the root directory of the project, create a file named `.env` (or `.env.local` for environment-specific configurations).

- Add the following key-value pair to store the Google Client ID:

  ```env
  VITE_GOOGLE_CLIENT_ID='your-client-id'
  ```

### 2. Access Environment Variables in Code

- Use import.meta.env to access the variable in your code.

Example:
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

### 3. Restart the Development Server

- After making changes to the .env file, restart the development server to apply the changes:

- npm run dev

- Do not commit the .env file to version control if it contains sensitive information. Add the .env file to .gitignore.
