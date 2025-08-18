import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/preact";
import { HomePage } from "../pages/HomePage";

vi.mock("@services/i18n", () => ({
  usePageTranslations: () => (key: string) => key,
}));

describe("HomePage Component", () => {
  it("should render main elements", () => {
    render(<HomePage />);

    // Check if main heading is rendered
    expect(screen.getByText("welcome")).toBeInTheDocument();

    // Check if features section is rendered
    expect(screen.getByText("features")).toBeInTheDocument();

    // Check if API Tester is rendered
    expect(screen.getByText("apiTesting")).toBeInTheDocument();
  });

  it("should render feature list", () => {
    render(<HomePage />);

    expect(screen.getByText("featureSSR")).toBeInTheDocument();
    expect(screen.getByText("featureSignals")).toBeInTheDocument();
    expect(screen.getByText("featureTailwind")).toBeInTheDocument();
    expect(screen.getByText("featureResponsive")).toBeInTheDocument();
    expect(screen.getByText("featureTheme")).toBeInTheDocument();
  });

  it("should have proper layout structure", () => {
    render(<HomePage />);

    // Check for grid layout - find the features section and then its parent grid
    const featuresElement = screen.getByText("features");
    const gridElement =
      featuresElement.closest(".grid") ||
      featuresElement.parentElement?.closest(".grid");
    expect(gridElement).toBeInTheDocument();
    expect(gridElement).toHaveClass("grid-cols-1", "lg:grid-cols-2");
  });
});
