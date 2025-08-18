import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button Component", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("text-white");
    expect(button).toHaveClass("rounded-md");
  });

  it("renders with different variants", () => {
    const { rerender } = render(<Button variant="secondary">Button</Button>);

    let button = screen.getByRole("button");
    expect(button).toHaveClass("bg-secondary");

    rerender(<Button variant="danger">Button</Button>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("bg-danger");

    rerender(<Button variant="ghost">Button</Button>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("bg-transparent");
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);

    let button = screen.getByRole("button");
    expect(button).toHaveClass("px-3");
    expect(button).toHaveClass("py-1.5");
    expect(button).toHaveClass("text-sm");

    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("px-6");
    expect(button).toHaveClass("py-3");
    expect(button).toHaveClass("text-lg");
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables button when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
    expect(button).toHaveClass("disabled:cursor-not-allowed");
  });

  it("shows loading state", () => {
    render(<Button loading>Loading</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Button</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
