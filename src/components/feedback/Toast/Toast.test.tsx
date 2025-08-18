// No need to import h - it's handled by JSX transform
import { render, screen, fireEvent, act } from '@testing-library/preact';
import { Toast } from './Toast';

describe('Toast', () => {
  it('renders with title and description', () => {
    render(
      <Toast
        id="test-toast"
        title="Test Title"
        description="Test description"
        variant="info"
        onClose={jest.fn()}
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders with only title', () => {
    render(
      <Toast
        id="test-toast"
        title="Success Title"
        variant="success"
        onClose={jest.fn()}
      />
    );

    expect(screen.getByText('Success Title')).toBeInTheDocument();
  });

  it('renders with only description', () => {
    render(
      <Toast
        id="test-toast"
        description="Warning description"
        variant="warning"
        onClose={jest.fn()}
      />
    );

    expect(screen.getByText('Warning description')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    const { container, rerender } = render(
      <Toast id="test-toast" title="Info" variant="info" onClose={jest.fn()} />
    );
    expect(container.firstChild).toHaveClass('bg-blue-50');

    rerender(
      <Toast
        id="test-toast"
        title="Success"
        variant="success"
        onClose={jest.fn()}
      />
    );
    expect(container.firstChild).toHaveClass('bg-green-50');

    rerender(
      <Toast
        id="test-toast"
        title="Warning"
        variant="warning"
        onClose={jest.fn()}
      />
    );
    expect(container.firstChild).toHaveClass('bg-yellow-50');

    rerender(
      <Toast
        id="test-toast"
        title="Error"
        variant="error"
        onClose={jest.fn()}
      />
    );
    expect(container.firstChild).toHaveClass('bg-red-50');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <Toast id="test-toast" title="Test" variant="info" onClose={onClose} />
    );

    const closeButton = screen.getByLabelText('Close toast');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledWith('test-toast');
  });

  it('renders action button when action is provided', () => {
    const action = {
      label: 'Action',
      onClick: jest.fn(),
    };

    render(
      <Toast
        id="test-toast"
        title="Test"
        variant="info"
        action={action}
        onClose={jest.fn()}
      />
    );

    const actionButton = screen.getByText('Action');
    expect(actionButton).toBeInTheDocument();

    fireEvent.click(actionButton);
    expect(action.onClick).toHaveBeenCalledTimes(1);
  });

  it('has correct ARIA attributes', () => {
    render(
      <Toast
        id="test-toast"
        title="Test Title"
        description="Test description"
        variant="info"
        onClose={jest.fn()}
      />
    );

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  it('auto-closes after duration when not persistent', () => {
    jest.useFakeTimers();
    const onClose = jest.fn();

    render(
      <Toast
        id="test-toast"
        title="Test"
        variant="info"
        duration={1000}
        onClose={onClose}
      />
    );

    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(onClose).toHaveBeenCalledWith('test-toast');

    jest.useRealTimers();
  });

  it('does not auto-close when persistent is true', () => {
    jest.useFakeTimers();
    const onClose = jest.fn();

    render(
      <Toast
        id="test-toast"
        title="Test"
        variant="info"
        persistent
        onClose={onClose}
      />
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(onClose).not.toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('uses default duration of 5000ms', () => {
    jest.useFakeTimers();
    const onClose = jest.fn();

    render(
      <Toast id="test-toast" title="Test" variant="info" onClose={onClose} />
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(onClose).toHaveBeenCalledWith('test-toast');

    jest.useRealTimers();
  });
});
