/**
 * @fileoverview Tests for AuthProvider component
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/preact";
import { useAuth, AuthButton } from "./AuthProvider";
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
  logout: vi.fn(),
  clearError: vi.fn(),
}));

// Mock the i18n service
vi.mock("@services/i18n", () => ({
  usePageTranslations: (_key: string) => (key: string) => {
    const translations: Record<string, string> = {
      loading: "Ładowanie...",
      login: "Zaloguj się",
      logout: "Wyloguj",
      authError: "Błąd uwierzytelniania",
      dismiss: "Zamknij",
    };
    return translations[key] || key;
  },
}));

describe("AuthProvider - useAuth hook", () => {
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

  it("should return initial auth state", () => {
    const TestComponent = () => {
      const auth = useAuth();
      return (
        <div>
          <span data-testid="loading">{auth.isLoading.toString()}</span>
          <span data-testid="authenticated">
            {auth.isAuthenticated.toString()}
          </span>
          <span data-testid="user">{auth.user?.email || "null"}</span>
        </div>
      );
    };

    render(<TestComponent />);

    expect(screen.getByTestId("loading")).toHaveTextContent("false");
    expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
    expect(screen.getByTestId("user")).toHaveTextContent("null");
  });

  it("should handle loading state", () => {
    auth0State.value = {
      ...auth0State.value,
      isLoading: true,
    };

    const TestComponent = () => {
      const auth = useAuth();
      return <span data-testid="loading">{auth.isLoading.toString()}</span>;
    };

    render(<TestComponent />);
    expect(screen.getByTestId("loading")).toHaveTextContent("true");
  });

  it("should handle authenticated state with user", () => {
    auth0State.value = {
      ...auth0State.value,
      isAuthenticated: true,
      user: {
        name: "Test User",
        email: "test@example.com",
        picture: "https://example.com/avatar.jpg",
        sub: "auth0|123",
      },
    };

    const TestComponent = () => {
      const auth = useAuth();
      return (
        <div>
          <span data-testid="authenticated">
            {auth.isAuthenticated.toString()}
          </span>
          <span data-testid="user-email">{auth.user?.email}</span>
          <span data-testid="user-name">{auth.user?.name}</span>
        </div>
      );
    };

    render(<TestComponent />);

    expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
    expect(screen.getByTestId("user-email")).toHaveTextContent(
      "test@example.com"
    );
    expect(screen.getByTestId("user-name")).toHaveTextContent("Test User");
  });

  it("should handle error state and auto-clear after 5 seconds", async () => {
    vi.useFakeTimers();
    const { clearError } = await import("@services/Auth0Provider");
    auth0State.value = {
      ...auth0State.value,
      error: "Authentication failed",
    };

    const TestComponent = () => {
      const auth = useAuth();
      return <span data-testid="error">{auth.error}</span>;
    };

    render(<TestComponent />);

    expect(screen.getByTestId("error")).toHaveTextContent(
      "Authentication failed"
    );

    // Fast-forward time by 5 seconds
    vi.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(clearError).toHaveBeenCalled();
    });
    vi.useRealTimers();
  });

  it("should handle login action", async () => {
    const { loginWithRedirect } = await import("@services/Auth0Provider");
    const TestComponent = () => {
      const auth = useAuth();
      return (
        <button onClick={auth.handleLogin} data-testid="login-btn">
          Login
        </button>
      );
    };

    render(<TestComponent />);

    const loginBtn = screen.getByTestId("login-btn");
    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(loginWithRedirect).toHaveBeenCalled();
    });
  });

  it("should handle logout action", async () => {
    const { logout } = await import("@services/Auth0Provider");
    auth0State.value = {
      ...auth0State.value,
      isAuthenticated: true,
      user: { email: "test@example.com" },
    };

    const TestComponent = () => {
      const auth = useAuth();
      return (
        <button onClick={auth.handleLogout} data-testid="logout-btn">
          Logout
        </button>
      );
    };

    render(<TestComponent />);

    const logoutBtn = screen.getByTestId("logout-btn");
    fireEvent.click(logoutBtn);

    await waitFor(() => {
      expect(logout).toHaveBeenCalled();
    });
  });
});

describe("AuthButton component", () => {
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

    render(<AuthButton isCollapsed={false} />);

    expect(screen.getByText("Ładowanie...")).toBeInTheDocument();
  });

  it("should render login button when not authenticated", () => {
    render(<AuthButton isCollapsed={false} />);

    expect(screen.getByText("Zaloguj się")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should render user info when authenticated", () => {
    auth0State.value = {
      ...auth0State.value,
      isAuthenticated: true,
      user: {
        name: "Test User",
        email: "test@example.com",
        picture: "https://example.com/avatar.jpg",
      },
    };

    render(<AuthButton isCollapsed={false} />);

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("Wyloguj")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://example.com/avatar.jpg"
    );
  });

  it("should render user initials when no picture available", () => {
    auth0State.value = {
      ...auth0State.value,
      isAuthenticated: true,
      user: {
        name: "Test User",
        email: "test@example.com",
      },
    };

    render(<AuthButton isCollapsed={false} />);

    expect(screen.getByText("T")).toBeInTheDocument(); // First letter of "Test User"
  });

  it("should render collapsed state", () => {
    auth0State.value = {
      ...auth0State.value,
      isAuthenticated: true,
      user: {
        name: "Test User",
        email: "test@example.com",
        picture: "https://example.com/avatar.jpg",
      },
    };

    render(<AuthButton isCollapsed={true} />);

    expect(screen.queryByText("Test User")).not.toBeInTheDocument();
    expect(screen.queryByText("Wyloguj")).not.toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should handle login click", async () => {
    const { loginWithRedirect } = await import("@services/Auth0Provider");
    render(<AuthButton isCollapsed={false} />);

    const loginBtn = screen.getByText("Zaloguj się");
    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(loginWithRedirect).toHaveBeenCalled();
    });
  });

  it("should handle logout click", async () => {
    const { logout } = await import("@services/Auth0Provider");
    auth0State.value = {
      ...auth0State.value,
      isAuthenticated: true,
      user: { email: "test@example.com" },
    };

    render(<AuthButton isCollapsed={false} />);

    const logoutBtn = screen.getByText("Wyloguj");
    fireEvent.click(logoutBtn);

    await waitFor(() => {
      expect(logout).toHaveBeenCalled();
    });
  });
});

describe("AuthProvider backward compatibility", () => {
  it("should provide AuthButton component", () => {
    expect(typeof AuthButton).toBe("function");
    const { container } = render(<AuthButton isCollapsed={false} />);
    expect(container).toBeInTheDocument();
  });
});
