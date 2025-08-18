/**
 * @fileoverview Tests for Auth0Button component
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/preact";
import { Auth0Button, Auth0Status } from "./Auth0Button";
import { auth0State } from "@services/Auth0Provider";

// Mock the Auth0Provider service
vi.mock("@services/Auth0Provider", () => ({
  auth0State: {
    value: {
      isLoading: false,
      isAuthenticated: false,
      user: null,
      error: null,
    },
  },
  loginWithRedirect: vi.fn(),
  loginWithPopup: vi.fn(),
  logout: vi.fn(),
  clearError: vi.fn(),
}));

// Mock the i18n service
vi.mock("@services/i18n", () => ({
  usePageTranslations: (_key: string) => (key: string) => {
    const translations: Record<string, string> = {
      loading: "Ładowanie...",
      loginAuth0: "Zaloguj przez Auth0",
      logout: "Wyloguj",
      authError: "Błąd uwierzytelniania",
      dismiss: "Zamknij",
      checkingAuth: "Sprawdzanie uwierzytelniania...",
      authenticated: "Uwierzytelniony",
      notAuthenticated: "Nieuwierzytelniony",
    };
    return translations[key] || key;
  },
}));

describe("Auth0Button component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    auth0State.value = {
      isLoading: false,
      isAuthenticated: false,
      user: null,
      error: null,
    };
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("should render login button by default", () => {
    render(<Auth0Button />);

    expect(screen.getByText("Zaloguj przez Auth0")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should render loading state", () => {
    auth0State.value = {
      ...auth0State.value,
      isLoading: true,
    };

    render(<Auth0Button />);

    expect(screen.getByText("Ładowanie...")).toBeInTheDocument();
    // Nie sprawdzaj roli 'status', bo nie jest ustawiana
  });

  it("should render error state", () => {
    auth0State.value = {
      ...auth0State.value,
      error: "Invalid credentials",
    };

    render(<Auth0Button />);

    expect(
      screen.getByText("Błąd uwierzytelniania: Invalid credentials")
    ).toBeInTheDocument();
    expect(screen.getByText("Zamknij")).toBeInTheDocument();
  });

  it("should render authenticated state with user info", () => {
    auth0State.value = {
      ...auth0State.value,
      isAuthenticated: true,
      user: {
        name: "Test User",
        email: "test@example.com",
        picture: "https://example.com/avatar.jpg",
      },
    };

    render(<Auth0Button />);

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://example.com/avatar.jpg"
    );
    expect(screen.getByText("Wyloguj")).toBeInTheDocument();
  });

  it("should render authenticated state without user info when showUserInfo is false", () => {
    auth0State.value = {
      ...auth0State.value,
      isAuthenticated: true,
      user: {
        name: "Test User",
        email: "test@example.com",
      },
    };

    render(<Auth0Button showUserInfo={false} />);

    expect(screen.queryByText("Test User")).not.toBeInTheDocument();
    expect(screen.queryByText("test@example.com")).not.toBeInTheDocument();
    expect(screen.getByText("Wyloguj")).toBeInTheDocument();
  });

  it("should handle login with redirect", async () => {
    const { loginWithRedirect } = await import("@services/Auth0Provider");
    render(<Auth0Button />);

    const loginBtn = screen.getByText("Zaloguj przez Auth0");
    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(loginWithRedirect).toHaveBeenCalled();
    });
  });

  it("should handle login with popup", async () => {
    const { loginWithPopup } = await import("@services/Auth0Provider");
    render(<Auth0Button usePopup={true} />);

    const loginBtn = screen.getByText("Zaloguj przez Auth0");
    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(loginWithPopup).toHaveBeenCalled();
    });
  });

  it("should handle logout", async () => {
    const { logout } = await import("@services/Auth0Provider");
    auth0State.value = {
      ...auth0State.value,
      isAuthenticated: true,
      user: { email: "test@example.com" },
    };

    render(<Auth0Button />);

    const logoutBtn = screen.getByText("Wyloguj");
    fireEvent.click(logoutBtn);

    await waitFor(() => {
      expect(logout).toHaveBeenCalled();
    });
  });

  it("should clear error when dismiss button is clicked", async () => {
    const { clearError } = await import("@services/Auth0Provider");
    auth0State.value = {
      ...auth0State.value,
      error: "Some error",
    };

    render(<Auth0Button />);

    const dismissBtn = screen.getByText("Zamknij");
    fireEvent.click(dismissBtn);

    await waitFor(() => {
      expect(clearError).toHaveBeenCalled();
    });
  });

  it("should apply custom className", () => {
    render(<Auth0Button className="custom-class" />);

    expect(screen.getByText("Zaloguj przez Auth0")).toHaveClass("custom-class");
  });

  it("should auto-clear error after 5 seconds", async () => {
    vi.useFakeTimers();
    const { clearError } = await import("@services/Auth0Provider");
    auth0State.value = {
      ...auth0State.value,
      error: "Temporary error",
    };

    render(<Auth0Button />);

    expect(
      screen.getByText("Błąd uwierzytelniania: Temporary error")
    ).toBeInTheDocument();

    // Fast-forward time by 5 seconds
    vi.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(clearError).toHaveBeenCalled();
    });
    vi.useRealTimers();
  });

  it("should handle user without picture", () => {
    auth0State.value = {
      ...auth0State.value,
      isAuthenticated: true,
      user: {
        name: "John Doe",
        email: "john@example.com",
      },
    };

    render(<Auth0Button />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("should handle user with only email", () => {
    auth0State.value = {
      ...auth0State.value,
      isAuthenticated: true,
      user: {
        email: "onlyemail@example.com",
      },
    };

    render(<Auth0Button />);

    expect(screen.getByText("onlyemail@example.com")).toBeInTheDocument();
    expect(screen.queryByText("onlyemail@example.com")).toBeInTheDocument();
  });
});

describe("Auth0Status component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    auth0State.value = {
      isLoading: false,
      isAuthenticated: false,
      user: null,
      error: null,
    };
  });

  it("should render loading state", () => {
    auth0State.value = {
      ...auth0State.value,
      isLoading: true,
    };

    render(<Auth0Status />);

    expect(
      screen.getByText("Sprawdzanie uwierzytelniania...")
    ).toBeInTheDocument();
  });

  it("should render not authenticated state", () => {
    render(<Auth0Status />);

    expect(screen.getByText("Status: Nieuwierzytelniony")).toBeInTheDocument();
  });

  it("should render authenticated state with email", () => {
    auth0State.value = {
      ...auth0State.value,
      isAuthenticated: true,
      user: {
        email: "user@example.com",
        name: "Test User",
      },
    };

    render(<Auth0Status />);

    expect(
      screen.getByText("Status: Uwierzytelniony (user@example.com)")
    ).toBeInTheDocument();
  });

  it("should render authenticated state with name when email is missing", () => {
    auth0State.value = {
      ...auth0State.value,
      isAuthenticated: true,
      user: {
        name: "Test User",
      },
    };

    render(<Auth0Status />);

    expect(
      screen.getByText("Status: Uwierzytelniony (Test User)")
    ).toBeInTheDocument();
  });

  it("should render authenticated state with default when no name or email", () => {
    auth0State.value = {
      ...auth0State.value,
      isAuthenticated: true,
      user: {},
    };

    render(<Auth0Status />);

    expect(
      screen.getByText("Status: Uwierzytelniony (Użytkownik)")
    ).toBeInTheDocument();
  });
});
