import { JSX } from 'preact';
import { cn } from '../../../utils/cn';

export interface TabProps {
  id: string;
  label: string;
  disabled?: boolean;
  icon?: preact.ComponentType<{ className?: string }>;
  active?: boolean;
  onClick?: (id: string) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const variantClasses = {
  default: {
    base: 'border-b-2 border-transparent',
    active: 'border-primary text-primary',
    inactive: 'text-gray-600 hover:text-gray-800 hover:border-gray-300',
    disabled: 'text-gray-400 cursor-not-allowed',
  },
  pills: {
    base: 'rounded-full',
    active: 'bg-primary text-white',
    inactive: 'text-gray-600 hover:bg-gray-100',
    disabled: 'text-gray-400 cursor-not-allowed',
  },
  underline: {
    base: 'border-b-2 border-transparent',
    active: 'border-primary text-primary',
    inactive: 'text-gray-600 hover:text-gray-800 hover:border-gray-300',
    disabled: 'text-gray-400 cursor-not-allowed',
  },
};

export function Tab({
  id,
  label,
  disabled,
  icon: Icon,
  active,
  onClick,
  size = 'md',
  variant = 'default',
  className,
}: Readonly<TabProps>): JSX.Element {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(id);
    }
  };

  const variantConfig = variantClasses[variant as keyof typeof variantClasses];

  let stateClass: string;
  if (disabled) {
    stateClass = variantConfig.disabled;
  } else if (active) {
    stateClass = variantConfig.active;
  } else {
    stateClass = variantConfig.inactive;
  }

  const getIconSize = (size: 'sm' | 'md' | 'lg'): string => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4';
      case 'md':
        return 'h-5 w-5';
      case 'lg':
        return 'h-6 w-6';
    }
  };

  const baseClasses = cn(
    'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
    sizeClasses[size],
    variantConfig.base,
    stateClass,
    className
  );

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={handleClick}
      className={baseClasses}
    >
      {Icon && <Icon className={cn('mr-2', getIconSize(size))} />}
      {label}
    </button>
  );
}
