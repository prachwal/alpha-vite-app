import { render, screen, fireEvent } from '@testing-library/preact';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('renders trigger element', () => {
    render(
      <Tooltip content="This is a tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('shows tooltip on hover', () => {
    render(
      <Tooltip content="This is a tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Hover me');
    fireEvent.mouseEnter(trigger);

    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', () => {
    render(
      <Tooltip content="This is a tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Hover me');
    fireEvent.mouseEnter(trigger);
    fireEvent.mouseLeave(trigger);

    expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on focus', () => {
    render(
      <Tooltip content="This is a tooltip">
        <button>Focus me</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Focus me');
    fireEvent.focus(trigger);

    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();
  });

  it('hides tooltip on blur', () => {
    render(
      <Tooltip content="This is a tooltip">
        <button>Focus me</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Focus me');
    fireEvent.focus(trigger);
    fireEvent.blur(trigger);

    expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
  });

  it('applies custom position classes', () => {
    render(
      <Tooltip content="This is a tooltip" position="bottom">
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Hover me');
    fireEvent.mouseEnter(trigger);

    const tooltip = screen.getByText('This is a tooltip');
    expect(tooltip).toHaveClass('top-full');
  });

  it('applies custom variant styles', () => {
    render(
      <Tooltip content="This is a tooltip" variant="error">
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Hover me');
    fireEvent.mouseEnter(trigger);

    const tooltip = screen.getByText('This is a tooltip');
    expect(tooltip).toHaveClass('bg-red-600');
  });

  it('has correct ARIA attributes', () => {
    render(
      <Tooltip content="This is a tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Hover me');
    expect(trigger).toHaveAttribute('aria-describedby');
  });

  it('supports custom delay', () => {
    jest.useFakeTimers();

    render(
      <Tooltip content="This is a tooltip" delay={0}>
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Hover me');
    fireEvent.mouseEnter(trigger);

    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();

    jest.useRealTimers();
  });

  it('supports disabled state', () => {
    render(
      <Tooltip content="This is a tooltip" disabled>
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Hover me');
    fireEvent.mouseEnter(trigger);

    expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Tooltip content="This is a tooltip" className="custom-tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Hover me');
    fireEvent.mouseEnter(trigger);

    const tooltip = screen.getByText('This is a tooltip');
    expect(tooltip.parentElement).toHaveClass('custom-tooltip');
  });
});
