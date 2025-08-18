import { render, screen } from '@testing-library/preact';
import { Divider } from './Divider';

describe('Divider Component', () => {
  it('renders horizontal divider by default', () => {
    render(<Divider />);
    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('w-full', 'h-px', 'bg-border');
  });

  it('renders vertical divider when orientation is vertical', () => {
    render(<Divider orientation="vertical" />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('h-full', 'w-px', 'bg-border');
  });

  it('applies correct thickness classes', () => {
    const { rerender } = render(<Divider thickness="thin" />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('h-px');

    rerender(<Divider thickness="medium" />);
    expect(divider).toHaveClass('h-0.5');

    rerender(<Divider thickness="thick" />);
    expect(divider).toHaveClass('h-1');
  });

  it('applies correct color classes', () => {
    const { rerender } = render(<Divider color="default" />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('bg-border');

    rerender(<Divider color="light" />);
    expect(divider).toHaveClass('bg-border-light');

    rerender(<Divider color="dark" />);
    expect(divider).toHaveClass('bg-border-dark');
  });

  it('applies dashed styling when dashed is true', () => {
    render(<Divider dashed={true} />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-dashed', 'border-current');
  });

  it('applies custom className', () => {
    render(<Divider className="custom-class" />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('custom-class');
  });

  it('renders vertical divider with correct thickness', () => {
    render(<Divider orientation="vertical" thickness="thick" />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('h-full', 'w-1');
  });
});
