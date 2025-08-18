import { render, fireEvent } from '@testing-library/preact';
import { Tag } from './Tag';

describe('Tag Component', () => {
  it('renders basic tag', () => {
    const { getByText } = render(<Tag>Test Tag</Tag>);
    expect(getByText('Test Tag')).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { getByText, rerender } = render(
      <Tag variant="primary">Primary</Tag>
    );
    expect(getByText('Primary')).toHaveClass('bg-blue-100');

    rerender(<Tag variant="success">Success</Tag>);
    expect(getByText('Success')).toHaveClass('bg-green-100');

    rerender(<Tag variant="error">Error</Tag>);
    expect(getByText('Error')).toHaveClass('bg-red-100');
  });

  it('renders with different sizes', () => {
    const { getByText, rerender } = render(<Tag size="sm">Small</Tag>);
    expect(getByText('Small')).toHaveClass('px-2.5', 'py-0.5', 'text-xs');

    rerender(<Tag size="lg">Large</Tag>);
    expect(getByText('Large')).toHaveClass('px-3.5', 'py-2', 'text-sm');
  });

  it('renders closable tag', () => {
    const handleClose = jest.fn();
    const { getByLabelText, getByText } = render(
      <Tag closable onClose={handleClose}>
        Closable Tag
      </Tag>
    );

    expect(getByText('Closable Tag')).toBeInTheDocument();
    const closeButton = getByLabelText('Remove tag');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders with icon', () => {
    const Icon = () => <span data-testid="test-icon">📧</span>;
    const { getByTestId } = render(<Tag icon={Icon}>Tag with Icon</Tag>);
    expect(getByTestId('test-icon')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Tag onClick={handleClick}>Clickable Tag</Tag>
    );

    fireEvent.click(getByText('Clickable Tag'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom color', () => {
    const { getByText } = render(
      <Tag color="bg-purple-100 text-purple-800">Custom Color</Tag>
    );
    expect(getByText('Custom Color')).toHaveClass('bg-purple-100');
  });

  it('applies custom className', () => {
    const { getByText } = render(
      <Tag className="custom-class">Custom Class</Tag>
    );
    expect(getByText('Custom Class')).toHaveClass('custom-class');
  });
});
