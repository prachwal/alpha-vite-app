import { useMemo } from "preact/hooks";

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  indeterminate?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  className?: string;
}

export function Checkbox({
  checked,
  onChange,
  label,
  size = "md",
  disabled = false,
  indeterminate = false,
  error = false,
  helperText,
  required = false,
  className = "",
}: Readonly<CheckboxProps>) {
  const checkboxId = useMemo(
    () => `checkbox-${Math.random().toString(36).slice(2, 11)}`,
    []
  );

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    onChange(target.checked);
  };

  const sizeClasses = useMemo(() => {
    const sizes = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    };
    return sizes[size];
  }, [size]);

  const checkboxClasses = useMemo(() => {
    const baseClasses = `
      rounded border-2 transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    if (disabled) {
      return `${baseClasses} bg-bg-muted border-border cursor-not-allowed`;
    }

    if (error) {
      return `${baseClasses} bg-bg-surface border-danger focus:ring-danger`;
    }

    if (checked || indeterminate) {
      return `${baseClasses} bg-primary border-primary focus:ring-primary`;
    }

    return `${baseClasses} bg-bg-surface border-border hover:border-primary focus:ring-primary`;
  }, [checked, indeterminate, disabled, error]);

  const iconClasses = useMemo(() => {
    const sizes = {
      sm: "h-3 w-3",
      md: "h-3.5 w-3.5",
      lg: "h-4 w-4",
    };
    return sizes[size];
  }, [size]);

  return (
    <div className={`${className}`}>
      <label className="flex items-start cursor-pointer">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id={checkboxId}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            className="sr-only"
            aria-describedby={helperText ? `${checkboxId}-helper` : undefined}
            ref={(input) => {
              if (input) {
                input.indeterminate = indeterminate && !checked;
              }
            }}
          />
          <div className={`${checkboxClasses} ${sizeClasses}`}>
            {(checked || indeterminate) && (
              <svg
                className={`${iconClasses} text-white`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                {indeterminate && !checked ? (
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 12h14"
                  />
                ) : (
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                )}
              </svg>
            )}
          </div>
        </div>

        {(label || helperText) && (
          <div className="ml-3 flex-1">
            {label && (
              <span className="text-sm text-text-primary">
                {label}
                {required && <span className="text-danger ml-1">*</span>}
              </span>
            )}
            {helperText && (
              <p
                id={`${checkboxId}-helper`}
                className={`text-sm ${
                  error ? "text-danger" : "text-text-muted"
                } ${label ? "mt-1" : ""}`}
              >
                {helperText}
              </p>
            )}
          </div>
        )}
      </label>
    </div>
  );
}

export default Checkbox;
