/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import { GoogleAuth } from "../GoogleAuth";

describe("GoogleAuth Component", () => {
  const mockSetToken = jest.fn();

  it("renders the Login with Google button", () => {
    render(<GoogleAuth setToken={mockSetToken} />);
    const button = screen.getByText(/Login with Google/i);
    expect(button).toBeInTheDocument();
  });

  it("calls signIn when the button is clicked", () => {
    const mockSignIn = jest.fn();
    jest.mock("react-google-login", () => ({
      useGoogleLogin: () => ({
        signIn: mockSignIn,
      }),
    }));

    render(<GoogleAuth setToken={mockSetToken} />);
    const button = screen.getByText(/Login with Google/i);
    fireEvent.click(button);
    expect(mockSignIn).toHaveBeenCalled();
  });
});
