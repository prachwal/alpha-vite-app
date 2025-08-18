import { h } from "preact";
import { render, screen, fireEvent } from "@testing-library/preact";
import { Dialog } from "./Dialog";
import "@testing-library/jest-dom";

describe("Dialog", () => {
  it("renders when isOpen is true", () => {
    render(
      <Dialog
        isOpen={true}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        title="Test Dialog"
        message="This is a test dialog"
      />
    );

    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("This is a test dialog")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(
      <Dialog
        isOpen={false}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        title="Test Dialog"
        message="This is a test dialog"
      />
    );

    expect(screen.queryByText("Test Dialog")).not.toBeInTheDocument();
  });

  it("calls onConfirm when confirm button is clicked", () => {
    const onConfirm = jest.fn();
    render(
      <Dialog
        isOpen={true}
        onClose={jest.fn()}
        onConfirm={onConfirm}
        title="Test Dialog"
        message="This is a test dialog"
      />
    );

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when cancel button is clicked", () => {
    const onClose = jest.fn();
    render(
      <Dialog
        isOpen={true}
        onClose={onClose}
        onConfirm={jest.fn()}
        title="Test Dialog"
        message="This is a test dialog"
      />
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when overlay is clicked", () => {
    const onClose = jest.fn();
    render(
      <Dialog
        isOpen={true}
        onClose={onClose}
        onConfirm={jest.fn()}
        title="Test Dialog"
        message="This is a test dialog"
      />
    );

    const overlay = screen.getByRole("dialog");
    fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("uses custom confirm button text", () => {
    render(
      <Dialog
        isOpen={true}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        title="Test Dialog"
        message="This is a test dialog"
        confirmText="Delete"
      />
    );

    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("uses custom cancel button text", () => {
    render(
      <Dialog
        isOpen={true}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        title="Test Dialog"
        message="This is a test dialog"
        cancelText="Go Back"
      />
    );

    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });

  it("renders with danger variant", () => {
    render(
      <Dialog
        isOpen={true}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        title="Delete Item"
        message="Are you sure you want to delete this item?"
        variant="danger"
      />
    );

    const confirmButton = screen.getByText("Confirm");
    expect(confirmButton).toHaveClass("bg-red-600");
  });

  it("has correct ARIA attributes", () => {
    render(
      <Dialog
        isOpen={true}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        title="Test Dialog"
        message="This is a test dialog"
      />
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
  });

  it("applies custom size", () => {
    render(
      <Dialog
        isOpen={true}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        title="Test Dialog"
        message="This is a test dialog"
        size="lg"
      />
    );

    const dialog = screen.getByRole("dialog");
    // Modal content is a child div with max-w-lg
    const content = Array.from(dialog.children).find((el) =>
      (el as HTMLElement).className.includes("max-w-lg")
    ) as HTMLElement;
    expect(content).toBeTruthy();
    expect(content.className).toMatch(/max-w-lg/);
  });
});
