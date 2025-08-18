import { useMemo } from "preact/hooks";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: readonly RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  size?: "sm" | "md" | "lg";
  layout?: "vertical" | "horizontal" | "grid";
  gridColumns?: 2 | 3 | 4;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export function RadioGroup({
  options,
  value,
  onChange,
  name,
  size = "md",
  layout = "vertical",
  gridColumns = 2,
  disabled = false,
  error = false,
  helperText,
  label,
  required = false,
  className = "",
}: Readonly<RadioGroupProps>) {
  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    onChange(target.value);
  };

  const sizeClasses = useMemo(() => {
    const sizes = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    };
    return sizes[size];
  }, [size]);

  const radioClasses = useMemo(() => {
    const baseClasses = `
      rounded-full border-2 transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    if (disabled) {
      return `${baseClasses} bg-bg-muted border-border cursor-not-allowed`;
    }

    if (error) {
      return `${baseClasses} bg-bg-surface border-danger focus:ring-danger`;
    }

    return `${baseClasses} bg-bg-surface border-border checked:bg-primary checked:border-primary focus:ring-primary`;
  }, [disabled, error]);

  const layoutClasses = useMemo(() => {
    const layouts = {
      vertical: "flex flex-col space-y-3",
      horizontal: "flex flex-wrap gap-x-6 gap-y-3",
      grid: `grid grid-cols-1 sm:grid-cols-${gridColumns} gap-4`,
    };
    return layouts[layout];
  }, [layout, gridColumns]);

  const groupId = useMemo(
    () => `radio-group-${Math.random().toString(36).slice(2, 11)}`,
    []
  );

  return (
    <div className={`${className}`}>
      {label && (
        <fieldset>
          <legend className="text-sm font-medium text-text-primary mb-2">
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </legend>
        </fieldset>
      )}

      <div
        role="radiogroup"
        aria-required={required}
        aria-invalid={error}
        aria-describedby={helperText ? `${groupId}-helper` : undefined}
        className={layoutClasses}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={`
              flex items-center cursor-pointer
              ${
                option.disabled || disabled
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }
            `}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              disabled={disabled || option.disabled}
              className="sr-only"
            />
            <div className={`relative ${sizeClasses} mr-3`}>
              <div className={`${radioClasses} absolute inset-0`} />
              {value === option.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`${sizeClasses} bg-primary rounded-full scale-50`}
                  />
                </div>
              )}
            </div>
            <span className="text-sm text-text-primary">{option.label}</span>
          </label>
        ))}
      </div>

      {helperText && (
        <p
          id={`${groupId}-helper`}
          className={`mt-2 text-sm ${
            error ? "text-danger" : "text-text-muted"
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
