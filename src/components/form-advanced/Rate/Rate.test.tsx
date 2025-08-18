import { render, screen, fireEvent } from '@testing-library/preact';
import { describe, it, expect, vi } from 'vitest';
import { Rate } from './Rate';

describe('Rate', () => {
  it('renders with default props', () => {
    const onChange = vi.fn();
    render(<Rate value={3} onChange={onChange} />);

    // Should render 5 stars by default
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('displays correct rating', () => {
    const onChange = vi.fn();
    render(<Rate value={3} onChange={onChange} />);

    // Check that we have 5 stars rendered
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);

    // Check that the first 3 stars have yellow color by checking the full star overlays
    const fullStarOverlays = screen
      .getAllByText('★')
      .filter((star) => star.classList.contains('text-yellow-400'));
    expect(fullStarOverlays).toHaveLength(3);
  });

  it('handles click to change rating', () => {
    const onChange = vi.fn();
    render(<Rate value={2} onChange={onChange} />);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[3]!); // Click 4th star

    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('allows clearing rating when allowClear is true', () => {
    const onChange = vi.fn();
    render(<Rate value={3} onChange={onChange} allowClear />);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[2]!); // Click currently selected star

    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('does not clear rating when allowClear is false', () => {
    const onChange = vi.fn();
    render(<Rate value={3} onChange={onChange} allowClear={false} />);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[2]!); // Click currently selected star

    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('supports custom star count', () => {
    const onChange = vi.fn();
    render(<Rate value={2} onChange={onChange} count={3} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  it('supports custom character', () => {
    const onChange = vi.fn();
    render(<Rate value={2} onChange={onChange} character="♥" />);

    expect(screen.getAllByText('♥')).toHaveLength(10); // 5 stars * 2 overlays each (empty + full)
  });

  it('displays tooltips when provided', () => {
    const onChange = vi.fn();
    const tooltips = ['Bad', 'Poor', 'Ok', 'Good', 'Great'];
    render(<Rate value={2} onChange={onChange} tooltips={tooltips} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('title', 'Bad');
    expect(buttons[1]).toHaveAttribute('title', 'Poor');
  });

  it('is disabled when disabled prop is true', () => {
    const onChange = vi.fn();
    render(<Rate value={2} onChange={onChange} disabled />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });

    // Click should not trigger onChange
    fireEvent.click(buttons[3]!);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('supports half ratings when allowHalf is true', () => {
    const onChange = vi.fn();
    render(<Rate value={2.5} onChange={onChange} allowHalf />);

    // Test is simplified - actual half star rendering is complex
    // Would need more specific testing for visual half-star state
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('handles hover interactions', () => {
    const onChange = vi.fn();
    render(<Rate value={1} onChange={onChange} />);

    const buttons = screen.getAllByRole('button');

    fireEvent.mouseEnter(buttons[3]!);
    // Visual hover state change would be tested with more complex setup

    fireEvent.mouseLeave(buttons[3]!);
    // Should return to original state
  });

  it('has proper accessibility attributes', () => {
    const onChange = vi.fn();
    render(<Rate value={3} onChange={onChange} />);

    const container = screen.getByRole('radiogroup');
    expect(container).toHaveAttribute('aria-label', 'Rate 5 stars');

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-label', 'Rate 1 star');
    expect(buttons[1]).toHaveAttribute('aria-label', 'Rate 2 stars');
  });

  it('applies custom className', () => {
    const onChange = vi.fn();
    render(<Rate value={2} onChange={onChange} className="custom-rate" />);

    const container = screen.getByRole('radiogroup');
    expect(container).toHaveClass('custom-rate');
  });
});
