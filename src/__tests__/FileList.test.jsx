/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import FileList from "../FileList";

describe("FileList Component", () => {
    it("renders a list of files", () => {
        const files = [{ id: "1", name: "File 1" }, { id: "2", name: "File 2" }];
        render(<FileList files={files} />);
        expect(screen.getByText(/File 1/i)).toBeInTheDocument();
        expect(screen.getByText(/File 2/i)).toBeInTheDocument();
    });

    it("renders a message when no files are available", () => {
        render(<FileList files={[]} />);
        expect(screen.getByText(/No files found/i)).toBeInTheDocument();
    });
});
