import { render, screen } from '@testing-library/preact';
import { Progress } from './Progress';

describe('Progress', () => {
  it('renders with default props', () => {
    const { container } = render(<Progress value={50} />);

    expect(container.querySelector('.w-full')).toBeInTheDocument();
  });

  it('displays correct percentage', () => {
    render(<Progress value={75} showText />);

    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('hides percentage when showText is false', () => {
    render(<Progress value={75} showText={false} />);

    expect(screen.queryByText('75%')).not.toBeInTheDocument();
  });

  it('applies custom max value', () => {
    render(<Progress value={50} max={200} showText />);

    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('handles edge cases', () => {
    const { rerender } = render(<Progress value={-10} showText />);
    expect(screen.getByText('-10%')).toBeInTheDocument();

    rerender(<Progress value={150} showText />);
    expect(screen.getByText('150%')).toBeInTheDocument();
  });

  it('applies custom variant colors', () => {
    const { container } = render(<Progress value={50} variant="success" />);

    const progressBar = container.querySelector('.h-full');
    expect(progressBar).toHaveClass('bg-green-500');
  });

  it('applies custom size', () => {
    const { container } = render(<Progress value={50} size="sm" />);

    const progressContainer = container.querySelector('.w-full.bg-gray-200');
    expect(progressContainer).toHaveClass('h-1');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Progress value={50} className="custom-class" />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('handles striped variant', () => {
    const { container } = render(<Progress value={50} striped />);

    const progressBar = container.querySelector('.h-full');
    expect(progressBar).toHaveClass('bg-gradient-to-r');
  });

  it('handles animated variant', () => {
    const { container } = render(<Progress value={50} striped animated />);

    const progressBar = container.querySelector('.h-full');
    expect(progressBar).toHaveClass('animate-pulse');
  });
});
