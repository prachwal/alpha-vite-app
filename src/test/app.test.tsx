import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/preact";
import { LocationProvider } from "preact-iso";
import { App } from "../app";

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
    expect(screen.getByText("Strona główna")).toBeInTheDocument();
    expect(screen.getByText("O aplikacji")).toBeInTheDocument();
    expect(screen.getByText("Ustawienia")).toBeInTheDocument();
  });

  it("should render theme toggle button", () => {
    renderWithLocationProvider();
    expect(
      screen.getByRole("button", { name: /Przełącz motyw/i })
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
    expect(screen.getByText("Witamy w Alpha Vite App")).toBeInTheDocument();
  });
});
