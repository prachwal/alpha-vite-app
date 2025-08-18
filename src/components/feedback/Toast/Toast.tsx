// No need to import h - it's handled by JSX transform
import { useEffect } from 'preact/hooks';

export interface ToastData {
  id: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  description?: string;
  duration?: number;
  persistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastProps extends ToastData {
  onClose: (id: string) => void;
}

const variantStyles = {
  info: {
    base: 'bg-blue-50 text-blue-800 border-blue-200',
    icon: 'text-blue-500',
    title: 'text-blue-900',
    description: 'text-blue-700',
  },
  success: {
    base: 'bg-green-50 text-green-800 border-green-200',
    icon: 'text-green-500',
    title: 'text-green-900',
    description: 'text-green-700',
  },
  warning: {
    base: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    icon: 'text-yellow-500',
    title: 'text-yellow-900',
    description: 'text-yellow-700',
  },
  error: {
    base: 'bg-red-50 text-red-800 border-red-200',
    icon: 'text-red-500',
    title: 'text-red-900',
    description: 'text-red-700',
  },
};

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, string> = {
    'check-circle': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    'exclamation-triangle':
      'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z',
    'x-circle':
      'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
    'information-circle':
      'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  };

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={icons[name]}
      />
    </svg>
  );
};

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export function Toast({
  id,
  variant = 'info',
  title,
  description,
  duration = 5000,
  persistent = false,
  action,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (!persistent && duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, persistent, onClose]);

  const styles = variantStyles[variant];

  const renderIcon = () => {
    let iconName: string;
    switch (variant) {
      case 'success':
        iconName = 'check-circle';
        break;
      case 'warning':
        iconName = 'exclamation-triangle';
        break;
      case 'error':
        iconName = 'x-circle';
        break;
      default:
        iconName = 'information-circle';
    }

    return <Icon name={iconName} className={cn('h-5 w-5', styles.icon)} />;
  };

  return (
    <div
      className={cn(
        'relative rounded-lg border p-4 shadow-lg',
        styles.base,
        'animate-slide-in-right'
      )}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">{renderIcon()}</div>

        <div className="ml-3 flex-1">
          {title && (
            <h3 className={cn('text-sm font-medium', styles.title)}>{title}</h3>
          )}

          {description && (
            <p
              className={cn(title ? 'mt-1' : '', 'text-sm', styles.description)}
            >
              {description}
            </p>
          )}

          {action && (
            <div className="mt-3">
              <button
                type="button"
                className={cn(
                  'inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2',
                  'bg-white bg-opacity-20 text-white hover:bg-opacity-30',
                  'focus:ring-white'
                )}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          className={cn(
            'ml-4 inline-flex flex-shrink-0 rounded-md p-1.5',
            'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2',
            'focus:ring-gray-500'
          )}
          onClick={() => onClose(id)}
          aria-label="Close toast"
        >
          <Icon name="x-circle" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
