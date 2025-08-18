import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input Component", () => {
  it("renders with default props", () => {
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("renders with value", () => {
    const handleChange = vi.fn();
    render(<Input value="test value" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("test value");
  });

  it("handles change events", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input value="" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "h");

    expect(handleChange).toHaveBeenCalled();
  });

  it("renders with placeholder", () => {
    const handleChange = vi.fn();
    render(
      <Input value="" onChange={handleChange} placeholder="Enter text here" />
    );

    const input = screen.getByPlaceholderText("Enter text here");
    expect(input).toBeInTheDocument();
  });

  it("renders with label", () => {
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} label="Username" />);

    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("renders required indicator", () => {
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} label="Email" required />);

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders disabled state", () => {
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} disabled />);

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("renders read-only state", () => {
    const handleChange = vi.fn();
    render(<Input value="read only" onChange={handleChange} readOnly />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("readonly");
  });

  it("renders error state", () => {
    const handleChange = vi.fn();
    render(
      <Input value="" onChange={handleChange} error label="Error field" />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-danger");
  });

  it("renders helper text", () => {
    const handleChange = vi.fn();
    render(
      <Input
        value=""
        onChange={handleChange}
        label="Field"
        helperText="This is helper text"
      />
    );

    expect(screen.getByText("This is helper text")).toBeInTheDocument();
  });

  it("renders different sizes", () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <Input value="" onChange={handleChange} size="sm" />
    );

    let input = screen.getByRole("textbox");
    expect(input).toHaveClass("px-3", "py-2", "text-sm");

    rerender(<Input value="" onChange={handleChange} size="lg" />);

    input = screen.getByRole("textbox");
    expect(input).toHaveClass("px-5", "py-3", "text-lg");
  });

  it("renders different variants", () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <Input value="" onChange={handleChange} variant="filled" />
    );

    let input = screen.getByRole("textbox");
    expect(input).toHaveClass("bg-bg-muted");

    rerender(<Input value="" onChange={handleChange} variant="outlined" />);

    input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-2");
  });

  it("renders with maxLength", () => {
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} maxLength={10} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("maxLength", "10");
  });

  it("renders with pattern", () => {
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} pattern="[0-9]+" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("pattern", "[0-9]+");
  });

  it("renders with autoComplete", () => {
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} autoComplete="email" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("autocomplete", "email");
  });

  it("renders full width", () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} fullWidth />
    );

    expect(container.firstChild).toHaveClass("w-full");
  });

  it("renders different input types", () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <Input value="" onChange={handleChange} type="email" />
    );

    let input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");

    rerender(<Input value="" onChange={handleChange} type="text" />);

    input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");
  });

  it("applies custom className", () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
