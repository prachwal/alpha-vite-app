import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/preact";
import { LocationProvider } from "preact-iso";
import { App } from "../app";

vi.mock("@services/i18n", () => ({
  usePageTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      appName: "Alpha Vite App",
      homePage: "Home",
      aboutPage: "About",
      settingsPage: "Settings",
      toggleTheme: "Toggle theme",
      welcome: "welcome",
    };
    return translations[key] || key;
  },
  t: (key: string) => {
    const translations: Record<string, string> = {
      appName: "Alpha Vite App",
      homePage: "Home",
      aboutPage: "About",
      settingsPage: "Settings",
      toggleTheme: "Toggle theme",
      welcome: "welcome",
    };
    return translations[key] || key;
  },
}));

const renderWithLocationProvider = () => {
  return render(
    <LocationProvider>
      <App />
    </LocationProvider>
  );
};

describe("App Component", () => {
  it("should render app name in header", () => {
    renderWithLocationProvider();
    const header = screen.getByRole("banner");
    expect(header).toHaveTextContent("Alpha Vite App");
  });

  it("should render sidebar navigation items", () => {
    renderWithLocationProvider();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("should render theme toggle button", () => {
    renderWithLocationProvider();
    expect(
      screen.getByRole("button", { name: "Toggle theme" })
    ).toBeInTheDocument();
  });

  it("should have responsive main content area", () => {
    renderWithLocationProvider();
    const mainContent = screen.getByRole("main");
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveClass("flex-1", "flex", "flex-col");
  });

  it("should display welcome message", () => {
    renderWithLocationProvider();
    expect(screen.getByText("welcome")).toBeInTheDocument();
  });
});
