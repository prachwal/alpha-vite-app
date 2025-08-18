import { useMemo } from 'preact/hooks';
import type { ComponentType } from 'preact';

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search';

export interface InputProps {
  type?: InputType;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  leftIcon?: ComponentType<any>;
  rightIcon?: ComponentType<any>;
  fullWidth?: boolean;
  maxLength?: number;
  pattern?: string;
  autoComplete?: string;
  className?: string;
}

export function Input({
  type = 'text',
  value,
  onChange,
  placeholder,
  size = 'md',
  variant = 'default',
  disabled = false,
  readOnly = false,
  error = false,
  helperText,
  label,
  required = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  fullWidth = false,
  maxLength,
  pattern,
  autoComplete,
  className = '',
}: Readonly<InputProps>) {
  const baseClasses = `
    block w-full rounded-md
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    read-only:cursor-default
    transition-colors duration-200
  `;

  const variantClasses = useMemo(() => {
    const variants = {
      default: `
        bg-bg-surface border border-border
        focus:border-primary focus:ring-primary
        ${error ? 'border-danger focus:border-danger focus:ring-danger' : ''}
      `,
      filled: `
        bg-bg-muted border-2 border-transparent
        focus:bg-bg-surface focus:border-primary focus:ring-primary
        ${error ? 'bg-danger/10 focus:border-danger focus:ring-danger' : ''}
      `,
      outlined: `
        bg-transparent border-2 border-border
        focus:border-primary focus:ring-primary
        ${error ? 'border-danger focus:border-danger focus:ring-danger' : ''}
      `,
    };
    return variants[variant];
  }, [variant, error]);

  const sizeClasses = useMemo(() => {
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-5 py-3 text-lg',
    };
    return sizes[size];
  }, [size]);

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    onChange(target.value);
  };

  const inputId = useMemo(
    () => `input-${Math.random().toString(36).substring(2, 11)}`,
    []
  );

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text-primary mb-1"
        >
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LeftIcon className="h-5 w-5 text-text-muted" />
          </div>
        )}

        <input
          id={inputId}
          type={type}
          value={value}
          onChange={handleChange}
          onInput={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          pattern={pattern}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={error}
          aria-describedby={helperText ? `${inputId}-helper` : undefined}
          className={`
            ${baseClasses}
            ${variantClasses}
            ${sizeClasses}
            ${LeftIcon ? 'pl-10' : ''}
            ${RightIcon ? 'pr-10' : ''}
          `}
        />

        {RightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <RightIcon className="h-5 w-5 text-text-muted" />
          </div>
        )}
      </div>

      {helperText && (
        <p
          id={`${inputId}-helper`}
          className={`mt-1 text-sm ${
            error ? 'text-danger' : 'text-text-muted'
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
