import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { Form, FormField } from "./Form";

describe("Form Component", () => {
  it("renders with default props", () => {
    render(<Form onSubmit={vi.fn()}>Form content</Form>);
    const form = screen.getByTestId("form");
    expect(form).toBeInTheDocument();
  });

  it("handles form submission", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(
      <Form onSubmit={vi.fn()} className="custom-class">
        Form content
      </Form>
    );
    const form = screen.getByTestId("form");
    expect(form).toHaveClass("custom-class");
  });

  it("renders children correctly", () => {
    render(
      <Form onSubmit={vi.fn()}>
        <div>Form field 1</div>
        <div>Form field 2</div>
      </Form>
    );

    expect(screen.getByText("Form field 1")).toBeInTheDocument();
    expect(screen.getByText("Form field 2")).toBeInTheDocument();
  });
});

describe("FormField Component", () => {
  it("renders with label", () => {
    render(
      <FormField label="Test Label">
        <input />
      </FormField>
    );
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders required indicator", () => {
    render(
      <FormField label="Required Field" required>
        <input />
      </FormField>
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders helper text", () => {
    render(
      <FormField helperText="Helper text">
        <input />
      </FormField>
    );
    expect(screen.getByText("Helper text")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <FormField className="custom-class" data-testid="form-field">
        <input />
      </FormField>
    );
    const container = screen.getByTestId("form-field");
    expect(container).toHaveClass("custom-class");
  });
});
