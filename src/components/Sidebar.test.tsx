import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { Sidebar } from "./Sidebar";

// Mock the SidebarState module
vi.mock("./SidebarState", () => ({
  sidebarOpen: { value: true },
  currentBreakpoint: { value: "desktop" },
  isHydrated: { value: true },
  currentPath: { value: "/" },
  toggleSidebar: vi.fn(),
  updateCurrentPath: vi.fn(),
}));

// Mock the i18n service
vi.mock("@services/i18n", () => ({
  t: (key: string) => {
    const translations: Record<string, string> = {
      toggleSidebar: "Toggle sidebar",
      homePage: "Home",
      aboutPage: "About",
      settingsPage: "Settings",
    };
    return translations[key] || key;
  },
}));

// Mock the AuthProvider
vi.mock("./AuthProvider", () => ({
  AuthButton: ({ isCollapsed }: { isCollapsed: boolean }) => (
    <div data-testid="auth-button" data-collapsed={isCollapsed}>
      Auth Button
    </div>
  ),
}));

describe("Sidebar Component", () => {
  beforeEach(() => {
    // Mock window.history
    Object.defineProperty(window, "history", {
      value: {
        pushState: vi.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders sidebar component", () => {
    render(<Sidebar />);

    const sidebar = screen.getByRole("complementary");
    expect(sidebar).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Sidebar />);

    const homeLink = screen.getByText("Home");
    const aboutLink = screen.getByText("About");
    const settingsLink = screen.getByText("Settings");

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
  });

  it("renders toggle button", () => {
    render(<Sidebar />);

    const toggleButton = screen.getByLabelText("Toggle sidebar");
    expect(toggleButton).toBeInTheDocument();
  });

  it("renders auth section", () => {
    render(<Sidebar />);

    const authButton = screen.getByTestId("auth-button");
    expect(authButton).toBeInTheDocument();
  });

  it("handles navigation correctly", async () => {
    const user = userEvent.setup();
    render(<Sidebar />);

    const homeLink = screen.getByText("Home");
    await user.click(homeLink);

    expect(window.history.pushState).toHaveBeenCalledWith({}, "", "/");
  });

  it("has correct sidebar structure", () => {
    render(<Sidebar />);

    const sidebar = screen.getByRole("complementary");
    const header = sidebar.querySelector("div > div:first-child");
    const nav = sidebar.querySelector("nav");
    const authSection = sidebar.querySelector("div > div:last-child");

    expect(header).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
    expect(authSection).toBeInTheDocument();
  });

  it("has correct CSS classes for sidebar", () => {
    render(<Sidebar />);

    const sidebar = screen.getByRole("complementary");
    expect(sidebar).toHaveClass("fixed", "top-0", "left-0", "h-screen");
  });
});
