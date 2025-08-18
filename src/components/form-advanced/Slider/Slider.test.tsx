import { render, screen, fireEvent } from "@testing-library/preact";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Slider, RangeSlider } from "./Slider";

describe("Slider", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} />);

    const input = screen.getByRole("slider");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("50");
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "100");
    expect(input).toHaveAttribute("step", "1");
  });

  it("handles value changes", () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} />);

    const input = screen.getByRole("slider");
    fireEvent.input(input, { target: { value: "75" } });

    expect(onChange).toHaveBeenCalledWith(75);
  });

  it("respects min and max props", () => {
    const onChange = vi.fn();
    render(<Slider value={25} onChange={onChange} min={10} max={90} />);

    const input = screen.getByRole("slider");
    expect(input).toHaveAttribute("min", "10");
    expect(input).toHaveAttribute("max", "90");
  });

  it("respects step prop", () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} step={5} />);

    const input = screen.getByRole("slider");
    expect(input).toHaveAttribute("step", "5");
  });

  it("is disabled when disabled prop is true", () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} disabled />);

    const input = screen.getByRole("slider");
    expect(input).toBeDisabled();
  });

  it("displays tooltip when tooltip is true", () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} tooltip />);

    const tooltip = screen.getByText("50");
    expect(tooltip).toBeInTheDocument();
  });

  it("displays custom tooltip content", () => {
    const onChange = vi.fn();
    const formatter = vi.fn((value: number) => `${value}%`);
    render(
      <Slider
        value={50}
        onChange={onChange}
        tooltip
        tooltipFormatter={formatter}
      />
    );

    expect(formatter).toHaveBeenCalledWith(50);
    const tooltip = screen.getByText("50%");
    expect(tooltip).toBeInTheDocument();
  });

  it("displays marks when provided", () => {
    const onChange = vi.fn();
    const marks = { 0: "0%", 50: "50%", 100: "100%" };
    render(<Slider value={50} onChange={onChange} marks={marks} />);

    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} className="custom-slider" />);

    const container = screen.getByRole("slider").parentElement;
    expect(container).toHaveClass("custom-slider");
  });

  it("handles keyboard navigation", () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} />);

    const input = screen.getByRole("slider");
    input.focus();

    fireEvent.keyDown(input, { key: "ArrowRight" });
    expect(onChange).toHaveBeenCalledWith(51);

    fireEvent.keyDown(input, { key: "ArrowLeft" });
    expect(onChange).toHaveBeenCalledWith(49);
  });

  it("does not call onChange when disabled", () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} disabled />);

    const input = screen.getByRole("slider");
    fireEvent.input(input, { target: { value: "75" } });

    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("RangeSlider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const onChange = vi.fn();
    render(<RangeSlider value={[25, 75]} onChange={onChange} />);

    const inputs = screen.getAllByRole("slider");
    expect(inputs).toHaveLength(2);
    expect(inputs[0]!).toHaveValue("25");
    expect(inputs[1]!).toHaveValue("75");
  });

  it("handles min value changes", () => {
    const onChange = vi.fn();
    render(<RangeSlider value={[25, 75]} onChange={onChange} />);

    const inputs = screen.getAllByRole("slider");
    fireEvent.input(inputs[0]!, { target: { value: "30" } });

    expect(onChange).toHaveBeenCalledWith([30, 75]);
  });

  it("handles max value changes", () => {
    const onChange = vi.fn();
    render(<RangeSlider value={[25, 75]} onChange={onChange} />);

    const inputs = screen.getAllByRole("slider");
    fireEvent.input(inputs[1]!, { target: { value: "80" } });

    expect(onChange).toHaveBeenCalledWith([25, 80]);
  });

  it("prevents min from exceeding max", () => {
    const onChange = vi.fn();
    render(<RangeSlider value={[25, 75]} onChange={onChange} />);

    const inputs = screen.getAllByRole("slider");
    fireEvent.input(inputs[0]!, { target: { value: "80" } });

    expect(onChange).toHaveBeenCalledWith([75, 75]);
  });

  it("prevents max from going below min", () => {
    const onChange = vi.fn();
    render(<RangeSlider value={[25, 75]} onChange={onChange} />);

    const inputs = screen.getAllByRole("slider");
    fireEvent.input(inputs[1]!, { target: { value: "20" } });

    expect(onChange).toHaveBeenCalledWith([25, 25]);
  });

  it("displays tooltips for both handles when tooltip is true", () => {
    const onChange = vi.fn();
    render(<RangeSlider value={[25, 75]} onChange={onChange} tooltip />);

    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("75")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    const onChange = vi.fn();
    render(<RangeSlider value={[25, 75]} onChange={onChange} disabled />);

    const inputs = screen.getAllByRole("slider");
    expect(inputs[0]!).toBeDisabled();
    expect(inputs[1]!).toBeDisabled();
  });

  it("applies custom className", () => {
    const onChange = vi.fn();
    render(
      <RangeSlider
        value={[25, 75]}
        onChange={onChange}
        className="custom-range-slider"
      />
    );

    const container = screen
      .getAllByRole("slider")[0]!
      .closest(".custom-range-slider");
    expect(container).toBeInTheDocument();
  });

  it("respects min, max, and step props", () => {
    const onChange = vi.fn();
    render(
      <RangeSlider
        value={[20, 80]}
        onChange={onChange}
        min={10}
        max={90}
        step={5}
      />
    );

    const inputs = screen.getAllByRole("slider");
    inputs.forEach((input) => {
      expect(input).toHaveAttribute("min", "10");
      expect(input).toHaveAttribute("max", "90");
      expect(input).toHaveAttribute("step", "5");
    });
  });
});
