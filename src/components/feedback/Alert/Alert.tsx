import { h } from "preact";
import { useState } from "preact/hooks";

// Define simple icon components
const Icon = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, string> = {
    "check-circle": "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    "exclamation-triangle":
      "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z",
    "x-circle":
      "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    "information-circle":
      "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    x: "M6 18L18 6M6 6l12 12",
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

// Simple cn utility
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

export interface AlertProps {
  variant?: "info" | "success" | "warning" | "error";
  size?: "small" | "medium" | "large";
  title?: string;
  description?: string;
  icon?: preact.ComponentType<any> | boolean | preact.VNode | null;
  closable?: boolean;
  onClose?: () => void;
  showIcon?: boolean;
  bordered?: boolean;
  children?: preact.ComponentChildren;
  className?: string;
}

const variantStyles = {
  info: {
    base: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-200 dark:border-blue-800",
    icon: "text-blue-500 dark:text-blue-400",
    title: "text-blue-900 dark:text-blue-100",
    description: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
  },
  success: {
    base: "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-200 dark:border-green-800",
    icon: "text-green-500 dark:text-green-400",
    title: "text-green-900 dark:text-green-100",
    description: "text-green-700 dark:text-green-300",
    border: "border-green-200 dark:border-green-800",
  },
  warning: {
    base: "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-200 dark:border-yellow-800",
    icon: "text-yellow-500 dark:text-yellow-400",
    title: "text-yellow-900 dark:text-yellow-100",
    description: "text-yellow-700 dark:text-yellow-300",
    border: "border-yellow-200 dark:border-yellow-800",
  },
  error: {
    base: "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-200 dark:border-red-800",
    icon: "text-red-500 dark:text-red-400",
    title: "text-red-900 dark:text-red-100",
    description: "text-red-700 dark:text-red-300",
    border: "border-red-200 dark:border-red-800",
  },
};

const sizeStyles = {
  small: "p-3 text-sm",
  medium: "p-4",
  large: "p-6 text-lg",
};

export function Alert({
  variant = "info",
  size = "medium",
  title,
  description,
  icon = true,
  closable = false,
  onClose,
  showIcon = true,
  bordered = false,
  children,
  className,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const styles = variantStyles[variant];
  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const renderIcon = () => {
    if (!showIcon || icon === false) return null;

    if (icon && typeof icon !== "boolean") {
      return icon;
    }

    let iconName: string;
    switch (variant) {
      case "success":
        iconName = "check-circle";
        break;
      case "warning":
        iconName = "exclamation-triangle";
        break;
      case "error":
        iconName = "x-circle";
        break;
      default:
        iconName = "information-circle";
    }
    return <Icon name={iconName} className={cn("h-5 w-5", styles.icon)} />;
  };

  return (
    <div
      className={cn(
        "relative rounded-lg flex items-start",
        styles.base,
        sizeStyles[size],
        bordered && cn("border", styles.border),
        className
      )}
      role="alert"
    >
      {showIcon && <div className="flex-shrink-0 mr-3">{renderIcon()}</div>}
      <div className="flex-1">
        {title && (
          <div className={cn("font-medium", styles.title)}>{title}</div>
        )}
        {description && (
          <div className={cn("text-sm", styles.description)}>{description}</div>
        )}
        {children}
      </div>
      {closable && (
        <button
          type="button"
          className={cn(
            "ml-3 inline-flex flex-shrink-0 rounded-md p-1.5",
            "hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2",
            "focus:ring-gray-500 dark:focus:ring-gray-400"
          )}
          onClick={handleClose}
          aria-label="Close alert"
        >
          <Icon name="x" className={cn("h-4 w-4", styles.icon)} />
        </button>
      )}
    </div>
  );
}
