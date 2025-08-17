import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/preact";
import { HomePage } from "../pages/HomePage";

describe("HomePage Component", () => {
  it("should render main elements", () => {
    render(<HomePage />);

    // Check if main heading is rendered
    expect(screen.getByText("Witamy w Alpha Vite App")).toBeInTheDocument();

    // Check if features section is rendered
    expect(screen.getByText("Funkcje")).toBeInTheDocument();

    // Check if API Tester is rendered
    expect(screen.getByText("API Tester")).toBeInTheDocument();
  });

  it("should render feature list", () => {
    render(<HomePage />);

    expect(screen.getByText("Server-Side Rendering")).toBeInTheDocument();
    expect(screen.getByText("Reaktywne sygnały")).toBeInTheDocument();
    expect(screen.getByText("Tailwind CSS")).toBeInTheDocument();
    expect(screen.getByText("Responsywny design")).toBeInTheDocument();
    expect(screen.getByText("Ciemny motyw")).toBeInTheDocument();
  });

  it("should have proper layout structure", () => {
    render(<HomePage />);

    // Check for grid layout - find the features section and then its parent grid
    const featuresElement = screen.getByText("Funkcje");
    const gridElement =
      featuresElement.closest(".grid") ||
      featuresElement.parentElement?.closest(".grid");
    expect(gridElement).toBeInTheDocument();
    expect(gridElement).toHaveClass("grid-cols-1", "lg:grid-cols-2");
  });
});
