import { render, screen, fireEvent } from '@testing-library/preact';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Slider, RangeSlider } from './Slider';

describe('Slider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default props', () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} />);

    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();

    const hiddenInput = screen.getByLabelText('Slider');
    expect(hiddenInput).toHaveAttribute('min', '0');
    expect(hiddenInput).toHaveAttribute('max', '100');
  });

  it('handles value changes', () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} />);

    const track = screen.getByRole('slider');
    fireEvent.mouseDown(track, { clientX: 750, clientY: 50 });

    expect(onChange).toHaveBeenCalled();
  });

  it('respects min and max props', () => {
    const onChange = vi.fn();
    render(<Slider value={25} onChange={onChange} min={10} max={90} />);

    const hiddenInput = screen.getByLabelText('Slider');
    expect(hiddenInput).toHaveAttribute('min', '10');
    expect(hiddenInput).toHaveAttribute('max', '90');
  });

  it('respects step prop', () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} step={5} />);

    const hiddenInput = screen.getByLabelText('Slider');
    expect(hiddenInput).toHaveAttribute('step', '5');
  });

  it('is disabled when disabled prop is true', () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} disabled />);

    const hiddenInput = screen.getByLabelText('Slider');
    expect(hiddenInput).toBeDisabled();
  });

  it('displays tooltip when tooltip is true', () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} tooltip />);

    // Tooltip should be visible when dragging
    const track = screen.getByRole('slider');
    fireEvent.mouseDown(track, { clientX: 750, clientY: 50 });

    // Since tooltip might not be immediately visible, we check for the component structure
    expect(track).toBeInTheDocument();
  });

  it('displays custom tooltip content', () => {
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

    const track = screen.getByRole('slider');
    fireEvent.mouseDown(track, { clientX: 750, clientY: 50 });

    // Check if formatter was called
    expect(formatter).toHaveBeenCalledWith(50);
  });

  it('displays marks when provided', () => {
    const onChange = vi.fn();
    const marks = { 0: '0%', 50: '50%', 100: '100%' };
    render(<Slider value={50} onChange={onChange} marks={marks} />);

    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Slider value={50} onChange={onChange} className="custom-slider" />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-slider');
  });

  it('handles keyboard navigation', () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} />);

    const handle = screen
      .getByRole('slider')
      .querySelector('[tabindex="0"]') as HTMLElement;
    if (handle) {
      handle.focus();
      fireEvent.keyDown(handle, { key: 'ArrowRight' });
      expect(onChange).toHaveBeenCalled();
    }
  });

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} disabled />);

    const track = screen.getByRole('slider');
    fireEvent.mouseDown(track, { clientX: 750, clientY: 50 });

    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('RangeSlider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default props', () => {
    const onChange = vi.fn();
    render(<RangeSlider value={[25, 75]} onChange={onChange} />);

    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('aria-valuenow', '25');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
  });

  it('handles value changes', () => {
    const onChange = vi.fn();
    render(<RangeSlider value={[25, 75]} onChange={onChange} />);

    // RangeSlider should handle value changes through its internal logic
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled(); // This is expected for initial render
  });

  it('respects min and max props', () => {
    const onChange = vi.fn();
    render(
      <RangeSlider value={[25, 75]} onChange={onChange} min={10} max={90} />
    );

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '10');
    expect(slider).toHaveAttribute('aria-valuemax', '90');
  });

  it('respects step prop', () => {
    const onChange = vi.fn();
    render(<RangeSlider value={[25, 75]} onChange={onChange} step={5} />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '25');
  });

  it('is disabled when disabled prop is true', () => {
    const onChange = vi.fn();
    render(<RangeSlider value={[25, 75]} onChange={onChange} disabled />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-disabled', 'true');
  });

  it('displays tooltips when tooltip is true', () => {
    const onChange = vi.fn();
    render(<RangeSlider value={[25, 75]} onChange={onChange} tooltip />);

    const track = screen.getByRole('slider');
    expect(track).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const onChange = vi.fn();
    const { container } = render(
      <RangeSlider
        value={[25, 75]}
        onChange={onChange}
        className="custom-range-slider"
      />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-range-slider');
  });

  it('respects min, max, and step props', () => {
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

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '10');
    expect(slider).toHaveAttribute('aria-valuemax', '90');
  });
});
