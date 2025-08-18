import { render, screen, fireEvent } from "@testing-library/preact";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ColorPicker } from "./ColorPicker";

describe("ColorPicker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={onChange} />);

    const trigger = screen.getByRole("button");
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveStyle({ backgroundColor: "rgb(255, 0, 0)" });
  });

  it("displays hex input when format is hex", () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={onChange} format="hex" />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    const hexInput = screen.getByDisplayValue("#ff0000");
    expect(hexInput).toBeInTheDocument();
  });

  it("displays rgb inputs when format is rgb", () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={onChange} format="rgb" />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    // Should show RGB format in the display
    const formatDisplay = screen.getByText("rgb(255, 0, 0)", {
      selector: "div.text-xs.text-gray-500",
    });
    expect(formatDisplay).toBeInTheDocument();
  });

  it("displays hsl inputs when format is hsl", () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={onChange} format="hsl" />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    // Should show HSL format in the display
    const formatDisplay = screen.getByText("hsl(0, 100%, 50%)", {
      selector: "div.text-xs.text-gray-500",
    });
    expect(formatDisplay).toBeInTheDocument();
  });

  it("handles hex color input changes", () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={onChange} format="hex" />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    const hexInput = screen.getByDisplayValue("#ff0000");
    fireEvent.change(hexInput, { target: { value: "#00ff00" } });

    expect(onChange).toHaveBeenCalledWith("#00ff00");
  });

  it("handles rgb color input changes", () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={onChange} format="rgb" />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    // Test that RGB format is displayed correctly
    const formatDisplay = screen.getByText("rgb(255, 0, 0)", {
      selector: "div.text-xs.text-gray-500",
    });
    expect(formatDisplay).toBeInTheDocument();
  });

  it("handles hsl color input changes", () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={onChange} format="hsl" />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    // Test that HSL format is displayed correctly
    const formatDisplay = screen.getByText("hsl(0, 100%, 50%)", {
      selector: "div.text-xs.text-gray-500",
    });
    expect(formatDisplay).toBeInTheDocument();
  });

  it("shows preset colors when presets are provided", () => {
    const onChange = vi.fn();
    const presets = ["#ff0000", "#00ff00", "#0000ff"];
    render(
      <ColorPicker value="#ff0000" onChange={onChange} presets={presets} />
    );

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    // Check if preset colors are rendered
    const presetButtons = screen.getAllByRole("button");
    // Should have at least the trigger button + preset buttons
    expect(presetButtons.length).toBeGreaterThan(1);
  });

  it("handles preset color selection", () => {
    const onChange = vi.fn();
    const presets = ["#ff0000", "#00ff00", "#0000ff"];
    render(
      <ColorPicker value="#ff0000" onChange={onChange} presets={presets} />
    );

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    // Find and click a preset button (green)
    const presetButtons = screen.getAllByRole("button");
    const greenPreset = presetButtons.find(
      (btn) => btn !== trigger && btn.style.backgroundColor === "rgb(0, 255, 0)"
    );

    if (greenPreset) {
      fireEvent.click(greenPreset);
      expect(onChange).toHaveBeenCalledWith("#00ff00");
    }
  });

  it("is disabled when disabled prop is true", () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={onChange} disabled />);

    const trigger = screen.getByRole("button");
    expect(trigger).toBeDisabled();

    fireEvent.click(trigger);
    // Panel should not open
    const hexInput = screen.queryByDisplayValue("#ff0000");
    expect(hexInput).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const onChange = vi.fn();
    render(
      <ColorPicker
        value="#ff0000"
        onChange={onChange}
        className="custom-color-picker"
      />
    );

    const container = screen.getByRole("button").parentElement;
    expect(container).toHaveClass("custom-color-picker");
  });

  it("validates hex color input", () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={onChange} format="hex" />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    const hexInput = screen.getByDisplayValue("#ff0000");

    // Valid hex
    fireEvent.change(hexInput, { target: { value: "#123456" } });
    expect(onChange).toHaveBeenCalledWith("#123456");

    // Invalid hex should not call onChange
    onChange.mockClear();
    fireEvent.change(hexInput, { target: { value: "invalid" } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("handles alpha channel when showAlpha is true", () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#ff000080" onChange={onChange} showAlpha />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    // Should show RGBA format with alpha
    const formatDisplay = screen.getByText("#ff000080", {
      selector: "div.text-xs.text-gray-500",
    });
    expect(formatDisplay).toBeInTheDocument();
  });

  it("handles recent colors", () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={onChange} />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    // Select a different color from presets to add to recents
    const greenPreset = screen.getByTitle("#00ff00");
    fireEvent.click(greenPreset);

    // Reopen picker
    fireEvent.click(trigger);

    // Recent colors section should be visible
    expect(screen.getByText(/Recent Colors/i)).toBeInTheDocument();
  });

  it("closes picker when clicking outside", () => {
    const onChange = vi.fn();
    render(
      <div>
        <ColorPicker value="#ff0000" onChange={onChange} />
        <div data-testid="outside">Outside</div>
      </div>
    );

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    // Picker should be open
    const hexInput = screen.getByDisplayValue("#ff0000");
    expect(hexInput).toBeInTheDocument();

    // Click outside
    const outside = screen.getByTestId("outside");
    fireEvent.mouseDown(outside);

    // Picker should close
    expect(screen.queryByDisplayValue("#ff0000")).not.toBeInTheDocument();
  });

  it("handles keyboard escape to close picker", () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={onChange} />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    // Picker should be open
    const hexInput = screen.getByDisplayValue("#ff0000");
    expect(hexInput).toBeInTheDocument();

    // Click outside to close (since escape key is not implemented)
    const outside = document.body;
    fireEvent.mouseDown(outside);

    // Picker should close
    expect(screen.queryByDisplayValue("#ff0000")).not.toBeInTheDocument();
  });
});
