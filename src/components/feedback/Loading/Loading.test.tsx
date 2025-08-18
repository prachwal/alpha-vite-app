// No need to import h - it's handled by JSX transform
import { render, screen, cleanup } from '@testing-library/preact';
import {
  Loading,
  LoadingSpinner,
  LoadingDots,
  LoadingBars,
  LoadingPulse,
} from './Loading';

describe('Loading', () => {
  it('renders with default spinner variant', () => {
    render(<Loading />);

    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toBeInTheDocument();
  });

  it('renders with specified variant', () => {
    const { rerender } = render(<Loading variant="dots" />);
    expect(screen.getByRole('status')).toBeInTheDocument();

    rerender(<Loading variant="bars" />);
    expect(screen.getByRole('status')).toBeInTheDocument();

    rerender(<Loading variant="pulse" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies custom size', () => {
    const { container } = render(<Loading size="lg" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Loading className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with label when provided', () => {
    render(<Loading label="Loading..." />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('applies correct color classes', () => {
    const { container } = render(<Loading color="primary" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    render(<Loading />);

    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveAttribute('aria-label', 'Loading');
  });

  it('uses custom aria-label when label is provided', () => {
    render(<Loading label="Custom loading" />);

    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toHaveAttribute('aria-label', 'Custom loading');
  });

  it('renders convenience components correctly', () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    cleanup();

    render(<LoadingDots />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    cleanup();

    render(<LoadingBars />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    cleanup();

    render(<LoadingPulse />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    cleanup();
  });
});
