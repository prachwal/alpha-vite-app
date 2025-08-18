import { useMemo } from 'preact/hooks';
import type { ComponentType } from 'preact';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ComponentType<any>;
  rightIcon?: ComponentType<any>;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: Event) => void;
  children: preact.ComponentChildren;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  type = 'button',
  onClick,
  children,
  className = '',
}: Readonly<ButtonProps>) {
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-md
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transition-all duration-200 ease-in-out
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:shadow-none
  `;

  const variantClasses = useMemo(() => {
    const variants = {
      primary: `
        bg-primary text-white
        hover:bg-primary-hover
        focus:ring-primary
        active:bg-primary-active
      `,
      secondary: `
        bg-secondary text-white
        hover:bg-secondary-hover
        focus:ring-secondary
        active:bg-secondary-active
      `,
      tertiary: `
        bg-tertiary text-white
        hover:bg-tertiary-hover
        focus:ring-tertiary
        active:bg-tertiary-active
      `,
      danger: `
        bg-danger text-white
        hover:bg-danger-hover
        focus:ring-danger
        active:bg-danger-active
      `,
      ghost: `
        bg-transparent text-text-primary
        hover:bg-bg-muted
        focus:ring-primary
        active:bg-bg-muted-hover
      `,
    };
    return variants[variant];
  }, [variant]);

  const sizeClasses = useMemo(() => {
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    };
    return sizes[size];
  }, [size]);

  const handleClick = (event: Event) => {
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={handleClick}
      className={`
        ${baseClasses}
        ${variantClasses}
        ${sizeClasses}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      aria-busy={loading}
      aria-disabled={isDisabled}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && LeftIcon && <LeftIcon className="mr-2 h-4 w-4" />}
      {children}
      {!loading && RightIcon && <RightIcon className="ml-2 h-4 w-4" />}
    </button>
  );
}
