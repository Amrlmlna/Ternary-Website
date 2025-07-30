import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AuthModal from "../../../components/AuthModal";
import { AuthProvider } from "../../contexts/AuthContext";
import { ToastProvider } from "../../contexts/ToastContext";

// Mock the auth context
const mockSignInWithGoogle = jest.fn();
const mockSignInWithGithub = jest.fn();
const mockSignInWithEmail = jest.fn();

jest.mock("../../contexts/AuthContext", () => ({
  ...jest.requireActual("../../contexts/AuthContext"),
  useAuth: () => ({
    signInWithGoogle: mockSignInWithGoogle,
    signInWithGithub: mockSignInWithGithub,
    signInWithEmail: mockSignInWithEmail,
    user: null,
    loading: false,
  }),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <AuthProvider>
      <ToastProvider>{component}</ToastProvider>
    </AuthProvider>
  );
};

describe("AuthModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders when open", () => {
    renderWithProviders(<AuthModal isOpen={true} onClose={jest.fn()} />);

    expect(screen.getByText("Masuk ke Ternary Premium")).toBeInTheDocument();
    expect(screen.getByText("OAuth")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    renderWithProviders(<AuthModal isOpen={false} onClose={jest.fn()} />);

    expect(
      screen.queryByText("Masuk ke Ternary Premium")
    ).not.toBeInTheDocument();
  });

  it("switches between OAuth and Email tabs", () => {
    renderWithProviders(<AuthModal isOpen={true} onClose={jest.fn()} />);

    // Initially OAuth tab should be active
    expect(screen.getByText("Masuk dengan Google")).toBeInTheDocument();

    // Click Email tab
    fireEvent.click(screen.getByText("Email"));

    // Email form should be visible
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByText("Kirim Magic Link")).toBeInTheDocument();
  });

  it("handles Google sign in", async () => {
    renderWithProviders(<AuthModal isOpen={true} onClose={jest.fn()} />);

    fireEvent.click(screen.getByText("Masuk dengan Google"));

    await waitFor(() => {
      expect(mockSignInWithGoogle).toHaveBeenCalled();
    });
  });

  it("handles GitHub sign in", async () => {
    renderWithProviders(<AuthModal isOpen={true} onClose={jest.fn()} />);

    fireEvent.click(screen.getByText("Masuk dengan GitHub"));

    await waitFor(() => {
      expect(mockSignInWithGithub).toHaveBeenCalled();
    });
  });

  it("handles email sign in", async () => {
    renderWithProviders(<AuthModal isOpen={true} onClose={jest.fn()} />);

    // Switch to email tab
    fireEvent.click(screen.getByText("Email"));

    // Fill email
    const emailInput = screen.getByLabelText("Email Address");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    // Submit form
    fireEvent.click(screen.getByText("Kirim Magic Link"));

    await waitFor(() => {
      expect(mockSignInWithEmail).toHaveBeenCalledWith("test@example.com");
    });
  });
});
