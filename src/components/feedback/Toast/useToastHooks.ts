import { useToast } from './ToastContext';
import { ToastData } from './Toast';

export const useToastHooks = () => {
  const { addToast } = useToast();

  const showToast = {
    info: (title: string, description?: string, duration?: number) => {
      return addToast({
        variant: 'info',
        title,
        ...(description && { description }),
        ...(duration && { duration }),
      });
    },

    success: (title: string, description?: string, duration?: number) => {
      return addToast({
        variant: 'success',
        title,
        ...(description && { description }),
        ...(duration && { duration }),
      });
    },

    warning: (title: string, description?: string, duration?: number) => {
      return addToast({
        variant: 'warning',
        title,
        ...(description && { description }),
        ...(duration && { duration }),
      });
    },

    error: (title: string, description?: string, duration?: number) => {
      return addToast({
        variant: 'error',
        title,
        ...(description && { description }),
        ...(duration && { duration }),
      });
    },

    custom: (toast: Omit<ToastData, 'id'>) => {
      return addToast(toast);
    },
  };

  return { showToast };
};
