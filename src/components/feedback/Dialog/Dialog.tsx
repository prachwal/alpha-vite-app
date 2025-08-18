import { useState } from 'preact/hooks';
import { Modal, ModalBody, ModalFooter } from '../Modal/Modal';
import { Button } from '../../form/Button/Button';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'info' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  closeOnOverlay?: boolean;
}

export function Dialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info',
  size = 'md',
  closeOnOverlay = true,
}: DialogProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setIsConfirming(false);
    }
  };

  const variantStyles = {
    info: {
      title: 'text-blue-900',
      confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    warning: {
      title: 'text-yellow-900',
      confirmButton: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    },
    danger: {
      title: 'text-red-900',
      confirmButton: 'bg-red-600 hover:bg-red-700 text-white',
    },
  };

  const styles = variantStyles[variant];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      closeOnOverlay={closeOnOverlay}
      closeOnEsc={false}
    >
      <ModalBody>
        <p className="text-gray-700">{message}</p>
      </ModalBody>

      <ModalFooter>
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose} disabled={isConfirming}>
            {cancelText}
          </Button>
          <Button
            variant="primary"
            className={styles.confirmButton}
            onClick={handleConfirm}
            loading={isConfirming}
          >
            {confirmText}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}

// Hook for easy dialog usage
export function useDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<DialogProps | null>(null);

  const open = (
    props: Omit<DialogProps, 'isOpen' | 'onClose' | 'onConfirm'>
  ) => {
    setConfig({
      ...props,
      isOpen: false,
      onClose: () => {},
      onConfirm: () => {},
    });
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setConfig(null);
  };

  const confirm = () => {
    if (config?.onConfirm) {
      config.onConfirm();
    }
    close();
  };

  const DialogComponent = () => {
    if (!config) return null;

    return (
      <Dialog {...config} isOpen={isOpen} onClose={close} onConfirm={confirm} />
    );
  };

  return {
    open,
    close,
    DialogComponent,
  };
}
