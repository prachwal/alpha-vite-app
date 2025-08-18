import { useMemo } from "preact/hooks";

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  children: preact.ComponentChildren;
  className?: string;
}

export interface FormProps {
  onSubmit: (event: Event) => void;
  children: preact.ComponentChildren;
  className?: string;
}

export function FormField({
  label,
  required = false,
  error = false,
  helperText,
  children,
  className = "",
}: Readonly<FormFieldProps>) {
  const fieldId = useMemo(
    () => `form-field-${Math.random().toString(36).slice(2, 11)}`,
    []
  );

  return (
    <div className={`space-y-1 ${className}`} data-testid="form-field">
      {label && (
        <label
          htmlFor={fieldId}
          className="block text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      <div>{children}</div>

      {helperText && (
        <p
          id={`${fieldId}-helper`}
          className={`text-sm ${error ? "text-danger" : "text-text-muted"}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

export function Form({
  onSubmit,
  children,
  className = "",
}: Readonly<FormProps>) {
  const handleSubmit = (event: Event) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      noValidate
      data-testid="form"
    >
      {children}
    </form>
  );
}

// Re-export validation utilities
export * from "./FormValidation";
