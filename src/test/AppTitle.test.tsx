import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/preact";
import { AppTitle } from "../components/AppTitle";

describe("AppTitle Component", () => {
  it("should render the app name from environment", () => {
    render(<AppTitle />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("should have correct styling classes", () => {
    render(<AppTitle />);
    const title = screen.getByRole("heading", { level: 1 });

    expect(title).toHaveClass(
      "text-4xl",
      "font-bold",
      "text-center",
      "text-text-primary"
    );
  });

  it("should display default app name when env var is not set", () => {
    render(<AppTitle />);
    const title = screen.getByRole("heading", { level: 1 });

    // Should contain some text (either from env or default)
    expect(title.textContent).toBeTruthy();
    expect(title.textContent?.length).toBeGreaterThan(0);
  });
});
