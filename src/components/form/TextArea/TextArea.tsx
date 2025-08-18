import { useMemo, useRef, useEffect } from "preact/hooks";

export interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  resize?: "none" | "vertical" | "horizontal" | "both";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "outlined";
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  maxLength?: number;
  autoResize?: boolean;
  className?: string;
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
  minRows = 2,
  maxRows = 10,
  resize = "vertical",
  size = "md",
  variant = "default",
  disabled = false,
  readOnly = false,
  error = false,
  helperText,
  label,
  required = false,
  fullWidth = false,
  maxLength,
  autoResize = false,
  className = "",
}: Readonly<TextAreaProps>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
        ${error ? "border-danger focus:border-danger focus:ring-danger" : ""}
      `,
      filled: `
        bg-bg-muted border-2 border-transparent
        focus:bg-bg-surface focus:border-primary focus:ring-primary
        ${error ? "bg-danger/10 focus:border-danger focus:ring-danger" : ""}
      `,
      outlined: `
        bg-transparent border-2 border-border
        focus:border-primary focus:ring-primary
        ${error ? "border-danger focus:border-danger focus:ring-danger" : ""}
      `,
    };
    return variants[variant];
  }, [variant, error]);

  const sizeClasses = useMemo(() => {
    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-5 py-3 text-lg",
    };
    return sizes[size];
  }, [size]);

  const resizeClasses = useMemo(() => {
    const resizes = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    };
    return resizes[resize];
  }, [resize]);

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";

      const scrollHeight = textarea.scrollHeight;
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
      const minHeight = minRows * lineHeight;
      const maxHeight = maxRows * lineHeight;

      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  }, [value, autoResize, minRows, maxRows]);

  const handleChange = (event: InputEvent | Event) => {
    const target = event.target as HTMLTextAreaElement;
    onChange(target.value);
  };

  const textareaId = useMemo(
    () => `textarea-${Math.random().toString(36).substring(2, 9)}`,
    []
  );

  const characterCount = value.length;
  const showCharacterCount = maxLength && maxLength > 0;

  return (
    <div className={`${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-text-primary mb-1"
        >
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <textarea
          ref={textareaRef}
          id={textareaId}
          value={value}
          onChange={handleChange}
          onInput={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          rows={autoResize ? minRows : rows}
          maxLength={maxLength}
          required={required}
          aria-invalid={error}
          aria-describedby={
            helperText || showCharacterCount
              ? `${textareaId}-helper`
              : undefined
          }
          className={`
            ${baseClasses}
            ${variantClasses}
            ${sizeClasses}
            ${resizeClasses}
            ${autoResize ? "overflow-hidden" : ""}
            ${className}
          `}
        />
      </div>

      {(helperText || showCharacterCount) && (
        <div
          id={`${textareaId}-helper`}
          className="mt-1 flex justify-between items-start"
        >
          {helperText && (
            <p
              className={`text-sm ${error ? "text-danger" : "text-text-muted"}`}
            >
              {helperText}
            </p>
          )}
          {showCharacterCount && (
            <p
              className={`text-sm ${
                error ? "text-danger" : "text-text-muted"
              } ml-auto`}
            >
              {characterCount}/{maxLength}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
