import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb Component', () => {
  it('renders breadcrumb items correctly', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Item', href: '/products/item' },
    ];

    render(<Breadcrumb items={items} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('renders separator between items', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
    ];

    const { container } = render(<Breadcrumb items={items} />);
    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators.length).toBeGreaterThan(0);
  });

  it('handles empty items array', () => {
    const { container } = render(<Breadcrumb items={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }]}
        className="custom-breadcrumb"
      />
    );
    expect(container.firstChild).toHaveClass('custom-breadcrumb');
  });
});
