import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./Checkbox";

describe("Checkbox Component", () => {
  it("renders with default props", () => {
    const handleChange = vi.fn();
    render(<Checkbox checked={false} onChange={handleChange} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("renders checked state", () => {
    const handleChange = vi.fn();
    render(<Checkbox checked={true} onChange={handleChange} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("renders with label", () => {
    const handleChange = vi.fn();
    render(
      <Checkbox checked={false} onChange={handleChange} label="Test label" />
    );

    expect(screen.getByText("Test label")).toBeInTheDocument();
  });

  it("handles change events", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox checked={false} onChange={handleChange} />);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("renders disabled state", () => {
    const handleChange = vi.fn();
    render(<Checkbox checked={false} onChange={handleChange} disabled />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  it("renders indeterminate state", () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        checked={false}
        onChange={handleChange}
        indeterminate
        label="Indeterminate checkbox"
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect((checkbox as HTMLInputElement).indeterminate).toBe(true);
  });

  it("renders error state", () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        checked={false}
        onChange={handleChange}
        error
        label="Error checkbox"
      />
    );

    const checkbox = screen.getByRole("checkbox");
    const checkboxContainer = checkbox.parentElement?.querySelector(
      'div[class*="border-"]'
    );
    expect(checkboxContainer).toHaveClass("border-danger");
  });

  it("renders helper text", () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        checked={false}
        onChange={handleChange}
        label="Checkbox with helper"
        helperText="This is helper text"
      />
    );

    expect(screen.getByText("This is helper text")).toBeInTheDocument();
  });

  it("renders required indicator", () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        checked={false}
        onChange={handleChange}
        label="Required checkbox"
        required
      />
    );

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders different sizes", () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <Checkbox
        checked={false}
        onChange={handleChange}
        size="sm"
        label="Small"
      />
    );

    const checkbox = screen.getByRole("checkbox");
    const checkboxContainer = checkbox.parentElement?.querySelector(
      'div[class*="h-"][class*="w-"]'
    );
    expect(checkboxContainer).toHaveClass("h-4", "w-4");

    rerender(
      <Checkbox
        checked={false}
        onChange={handleChange}
        size="lg"
        label="Large"
      />
    );

    const checkboxAfterRerender = screen.getByRole("checkbox");
    const checkboxContainerAfterRerender =
      checkboxAfterRerender.parentElement?.querySelector(
        'div[class*="h-"][class*="w-"]'
      );
    expect(checkboxContainerAfterRerender).toHaveClass("h-6", "w-6");
  });

  it("applies custom className", () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Checkbox
        checked={false}
        onChange={handleChange}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
