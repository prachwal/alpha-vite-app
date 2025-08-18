interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
}

interface SelectProps {
  readonly options: readonly SelectOption[];
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
  readonly size?: "sm" | "md" | "lg";
  readonly variant?: "default" | "filled" | "outlined";
  readonly disabled?: boolean;
  readonly error?: boolean;
  readonly helperText?: string;
  readonly className?: string;
  readonly fullWidth?: boolean;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  size = "md",
  variant = "default",
  disabled = false,
  error = false,
  helperText,
  className = "",
  fullWidth = false,
}: Readonly<SelectProps>) {
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2",
    lg: "px-4 py-3 text-lg",
  };

  const variantClasses = {
    default: "bg-bg-muted border border-border",
    filled: "bg-bg-surface border-2 border-transparent",
    outlined: "bg-transparent border-2 border-border",
  };

  const baseClasses = `
    rounded transition-all duration-200 
    text-text-primary 
    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
    disabled:opacity-50 disabled:cursor-not-allowed
    appearance-none cursor-pointer
  `;

  const errorClasses = error ? "border-red-500 focus:ring-red-500" : "";

  const widthClasses = fullWidth ? "w-full" : "w-auto min-w-[120px]";

  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e: Event) => {
          const target = e.target as HTMLSelectElement;
          onChange(target.value);
        }}
        disabled={disabled}
        className={`
          ${baseClasses}
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${errorClasses}
          ${widthClasses}
          pr-8
        `}
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%23666' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
          backgroundPosition: "right 8px center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "16px 16px",
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className="bg-bg-muted text-text-primary"
          >
            {option.label}
          </option>
        ))}
      </select>

      {helperText && (
        <div
          className={`text-xs mt-1 ${
            error ? "text-red-500" : "text-text-muted"
          }`}
        >
          {helperText}
        </div>
      )}
    </div>
  );
}

export type { SelectOption, SelectProps };
