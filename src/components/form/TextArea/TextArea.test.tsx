import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { TextArea } from "./TextArea";

describe("TextArea Component", () => {
  const mockOnChange = vi.fn();

  it("renders with default props", () => {
    render(<TextArea value="" onChange={mockOnChange} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass("block", "w-full", "rounded-md", "text-base");
  });

  it("renders with label", () => {
    render(<TextArea value="" onChange={mockOnChange} label="Test Label" />);
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  it("renders with placeholder", () => {
    render(
      <TextArea value="" onChange={mockOnChange} placeholder="Enter text" />
    );
    const textarea = screen.getByPlaceholderText("Enter text");
    expect(textarea).toBeInTheDocument();
  });

  it("renders with custom size", () => {
    render(<TextArea value="" onChange={mockOnChange} size="lg" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("text-lg");
    expect(textarea).toHaveClass("px-5");
    expect(textarea).toHaveClass("py-3");
  });

  it("renders disabled state", () => {
    render(<TextArea value="" onChange={mockOnChange} disabled />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
  });

  it("renders error state", () => {
    render(<TextArea value="" onChange={mockOnChange} error />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("border-danger");
    expect(textarea).toHaveClass("focus:border-danger");
    expect(textarea).toHaveClass("focus:ring-danger");
  });

  it("handles value changes", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<TextArea value="" onChange={handleChange} />);
    const textarea = screen.getByRole("textbox");

    await user.type(textarea, "test");
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders with helper text", () => {
    render(
      <TextArea value="" onChange={mockOnChange} helperText="Helper text" />
    );
    expect(screen.getByText("Helper text")).toBeInTheDocument();
  });

  it("renders required indicator", () => {
    render(
      <TextArea
        value=""
        onChange={mockOnChange}
        label="Required Field"
        required
      />
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders with custom rows", () => {
    render(<TextArea value="" onChange={mockOnChange} rows={5} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "5");
  });

  it("renders with full width", () => {
    render(<TextArea value="" onChange={mockOnChange} fullWidth />);
    const textarea = screen.getByRole("textbox");
    expect(textarea.parentElement).toHaveClass("relative");
  });

  it("applies custom className", () => {
    render(
      <TextArea value="" onChange={mockOnChange} className="custom-class" />
    );
    const textarea = screen.getByRole("textbox");
    expect(textarea.className).toContain("custom-class");
  });
});
