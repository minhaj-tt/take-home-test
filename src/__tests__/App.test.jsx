/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("App Integration", () => {
    it("logs in and lists files after authentication", async () => {
        const mockFiles = [
            { id: "1", name: "Sample File 1" },
            { id: "2", name: "Sample File 2" },
        ];

        jest.mock("../api", () => ({
            listFiles: jest.fn(() => Promise.resolve(mockFiles)),
        }));

        render(<App />);

        const loginButton = screen.getByText(/Login with Google/i);
        fireEvent.click(loginButton);

        const file1 = await screen.findByText(/Sample File 1/i);
        const file2 = await screen.findByText(/Sample File 2/i);
        expect(file1).toBeInTheDocument();
        expect(file2).toBeInTheDocument();
    });
});
