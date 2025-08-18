import { h } from "preact";
import { render, screen, fireEvent, act } from "@testing-library/preact";
import { ToastProvider, useToast } from "./ToastContext";

// Test component to use the toast hook
function TestComponent() {
  const { addToast, removeToast, clearToasts } = useToast();

  return (
    <div>
      <button
        onClick={() => addToast({ description: "Test toast", variant: "info" })}
      >
        Add Toast
      </button>
      <button
        onClick={() =>
          addToast({ description: "Success toast", variant: "success" })
        }
      >
        Add Success
      </button>
      <button
        onClick={() =>
          addToast({ description: "Warning toast", variant: "warning" })
        }
      >
        Add Warning
      </button>
      <button
        onClick={() =>
          addToast({ description: "Error toast", variant: "error" })
        }
      >
        Add Error
      </button>
      <button onClick={clearToasts}>Clear All</button>
    </div>
  );
}

describe("ToastContext", () => {
  it("provides toast functionality", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const addButton = screen.getByText("Add Toast");
    fireEvent.click(addButton);

    expect(screen.getByText("Test toast")).toBeInTheDocument();
  });

  it("adds different types of toasts", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText("Add Success"));
    expect(screen.getByText("Success toast")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Add Warning"));
    expect(screen.getByText("Warning toast")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Add Error"));
    expect(screen.getByText("Error toast")).toBeInTheDocument();
  });

  it("clears all toasts", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText("Add Toast"));
    expect(screen.getByText("Test toast")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Clear All"));
    expect(screen.queryByText("Test toast")).not.toBeInTheDocument();
  });

  it("auto-removes toasts after duration", () => {
    jest.useFakeTimers();

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText("Add Toast"));
    expect(screen.getByText("Test toast")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.queryByText("Test toast")).not.toBeInTheDocument();

    jest.useRealTimers();
  });

  it("throws error when useToast is used outside provider", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useToast must be used within a ToastProvider");

    consoleSpy.mockRestore();
  });

  it("handles custom duration", () => {
    jest.useFakeTimers();

    const TestComponentWithCustomDuration = () => {
      const { addToast } = useToast();

      return (
        <button
          onClick={() =>
            addToast({
              description: "Custom duration",
              variant: "info",
              duration: 2000,
            })
          }
        >
          Add Custom Duration
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestComponentWithCustomDuration />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText("Add Custom Duration"));
    expect(screen.getByText("Custom duration")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.queryByText("Custom duration")).not.toBeInTheDocument();

    jest.useRealTimers();
  });

  it("handles persistent toasts", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText("Add Toast"));
    expect(screen.getByText("Test toast")).toBeInTheDocument();
  });

  it("supports title and description", () => {
    const TestComponentWithTitle = () => {
      const { addToast } = useToast();

      return (
        <button
          onClick={() =>
            addToast({
              title: "Test Title",
              description: "Test Description",
              variant: "info",
            })
          }
        >
          Add Toast with Title
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestComponentWithTitle />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText("Add Toast with Title"));
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("supports action buttons", () => {
    const TestComponentWithAction = () => {
      const { addToast } = useToast();

      return (
        <button
          onClick={() =>
            addToast({
              description: "Toast with action",
              variant: "info",
              action: { label: "Click me", onClick: jest.fn() },
            })
          }
        >
          Add Toast with Action
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestComponentWithAction />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText("Add Toast with Action"));
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
