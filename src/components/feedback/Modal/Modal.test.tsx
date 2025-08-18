// No need to import h - it's handled by JSX transform
import { render, screen, fireEvent } from '@testing-library/preact';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when modal content is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

    const content = screen.getByText('Modal Content');
    fireEvent.click(content);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('has correct ARIA attributes', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('applies custom className', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} className="custom-class">
        <div>Modal Content</div>
      </Modal>
    );

    const overlay = screen.getByRole('dialog');
    const content = Array.from(overlay.children).find((el) =>
      (el as HTMLElement).className.includes('custom-class')
    ) as HTMLElement;
    expect(content).toBeTruthy();
    expect(content.className).toMatch(/custom-class/);
  });

  it('renders with title', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} title="Test Title">
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders with size prop', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={jest.fn()} size="sm">
        <div>Modal Content</div>
      </Modal>
    );

    let overlay = screen.getByRole('dialog');
    let content = Array.from(overlay.children).find((el) =>
      (el as HTMLElement).className.includes('max-w-sm')
    ) as HTMLElement;
    expect(content).toBeTruthy();
    expect(content.className).toMatch(/max-w-sm/);

    rerender(
      <Modal isOpen={true} onClose={jest.fn()} size="lg">
        <div>Modal Content</div>
      </Modal>
    );

    overlay = screen.getByRole('dialog');
    content = Array.from(overlay.children).find((el) =>
      (el as HTMLElement).className.includes('max-w-lg')
    ) as HTMLElement;
    expect(content).toBeTruthy();
    expect(content.className).toMatch(/max-w-lg/);
  });

  it('prevents body scroll when open', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Modal isOpen={false} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe('');
  });

  it('does not close on overlay click when closeOnOverlay is false', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose} closeOnOverlay={false}>
        <div>Modal Content</div>
      </Modal>
    );

    const overlay = screen.getByRole('dialog').parentElement;
    fireEvent.click(overlay!);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not close on Escape when closeOnEsc is false', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose} closeOnEsc={false}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('hides close button when showCloseButton is false', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} showCloseButton={false}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
  });
});
