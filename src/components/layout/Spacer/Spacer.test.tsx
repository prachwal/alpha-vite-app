import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Spacer } from './Spacer';

describe('Spacer Component', () => {
  it('renders with default props', () => {
    render(<Spacer data-testid="spacer" />);
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toBeInTheDocument();
    expect(spacer).toHaveClass('h-4', 'flex-shrink-0');
  });

  it('renders vertical spacer with different sizes', () => {
    const { rerender } = render(<Spacer size="xs" data-testid="spacer" />);
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toHaveClass('h-1');

    rerender(<Spacer size="sm" data-testid="spacer" />);
    expect(spacer).toHaveClass('h-2');

    rerender(<Spacer size="md" data-testid="spacer" />);
    expect(spacer).toHaveClass('h-4');

    rerender(<Spacer size="lg" data-testid="spacer" />);
    expect(spacer).toHaveClass('h-6');

    rerender(<Spacer size="xl" data-testid="spacer" />);
    expect(spacer).toHaveClass('h-8');

    rerender(<Spacer size="2xl" data-testid="spacer" />);
    expect(spacer).toHaveClass('h-12');
  });

  it('renders horizontal spacer with different sizes', () => {
    const { rerender } = render(
      <Spacer direction="horizontal" size="xs" data-testid="spacer" />
    );
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toHaveClass('w-1');

    rerender(<Spacer direction="horizontal" size="sm" data-testid="spacer" />);
    expect(spacer).toHaveClass('w-2');

    rerender(<Spacer direction="horizontal" size="md" data-testid="spacer" />);
    expect(spacer).toHaveClass('w-4');

    rerender(<Spacer direction="horizontal" size="lg" data-testid="spacer" />);
    expect(spacer).toHaveClass('w-6');

    rerender(<Spacer direction="horizontal" size="xl" data-testid="spacer" />);
    expect(spacer).toHaveClass('w-8');

    rerender(<Spacer direction="horizontal" size="2xl" data-testid="spacer" />);
    expect(spacer).toHaveClass('w-12');
  });

  it('applies custom className', () => {
    render(<Spacer className="custom-class" data-testid="spacer" />);
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toHaveClass('custom-class');
  });

  it('has aria-hidden attribute', () => {
    render(<Spacer data-testid="spacer" />);
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toHaveAttribute('aria-hidden', 'true');
  });

  it('combines size and direction correctly', () => {
    render(<Spacer size="lg" direction="horizontal" data-testid="spacer" />);
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toHaveClass('w-6', 'flex-shrink-0');
  });
});
