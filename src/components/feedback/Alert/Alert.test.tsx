import { render, screen, fireEvent } from "@testing-library/preact";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders with title and description", () => {
    render(
      <Alert variant="info" title="Test Title" description="Test description" />
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders with only title", () => {
    render(<Alert variant="success" title="Success Title" />);

    expect(screen.getByText("Success Title")).toBeInTheDocument();
  });

  it("renders with only description", () => {
    render(<Alert variant="warning" description="Warning description" />);

    expect(screen.getByText("Warning description")).toBeInTheDocument();
  });

  it("applies correct variant classes", () => {
    const { container, rerender } = render(
      <Alert variant="info" title="Info" />
    );
    expect(container.firstChild).toHaveClass("bg-blue-50");

    rerender(<Alert variant="success" title="Success" />);
    expect(container.firstChild).toHaveClass("bg-green-50");

    rerender(<Alert variant="warning" title="Warning" />);
    expect(container.firstChild).toHaveClass("bg-yellow-50");

    rerender(<Alert variant="error" title="Error" />);
    expect(container.firstChild).toHaveClass("bg-red-50");
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<Alert variant="info" title="Test" closable onClose={onClose} />);

    const closeButton = screen.getByLabelText("Close alert");
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not render close button when closable is false", () => {
    render(<Alert variant="info" title="Test" />);

    expect(screen.queryByLabelText("Close alert")).not.toBeInTheDocument();
  });

  it("renders close button when closable is true", () => {
    render(<Alert variant="info" title="Test" closable />);

    expect(screen.getByLabelText("Close alert")).toBeInTheDocument();
  });

  it("has correct ARIA attributes", () => {
    render(
      <Alert variant="info" title="Test Title" description="Test description" />
    );

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  it("renders children when provided", () => {
    render(
      <Alert variant="info">
        <div data-testid="child-content">Custom content</div>
      </Alert>
    );

    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Alert variant="info" title="Test" className="custom-class" />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("applies bordered style when bordered is true", () => {
    const { container } = render(
      <Alert variant="info" title="Test" bordered />
    );

    expect(container.firstChild).toHaveClass("border");
  });

  it("hides icon when showIcon is false", () => {
    render(<Alert variant="info" title="Test" showIcon={false} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
