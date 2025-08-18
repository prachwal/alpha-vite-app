import { JSX } from "preact";
import { cn } from "../../../utils/cn";

export interface TagProps {
  variant?: "default" | "primary" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  closable?: boolean;
  onClose?: () => void;
  onClick?: () => void;
  icon?: preact.ComponentType<{ className?: string }>;
  color?: string;
  children: preact.ComponentChildren;
  className?: string;
}

const variantColors = {
  default: "bg-gray-100 text-gray-700 border-gray-200",
  primary: "bg-blue-100 text-blue-700 border-blue-200",
  success: "bg-green-100 text-green-700 border-green-200",
  warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
  error: "bg-red-100 text-red-700 border-red-200",
  info: "bg-purple-100 text-purple-700 border-purple-200",
};

const sizeClasses = {
  sm: "px-2.5 py-0.5 text-xs",
  md: "px-2.5 py-1.5 text-sm",
  lg: "px-3.5 py-2 text-sm",
};

export function Tag({
  variant = "default",
  size = "md",
  closable = false,
  onClose,
  onClick,
  icon: Icon,
  color,
  children,
  className,
}: Readonly<TagProps>): JSX.Element {
  const handleClose = (e: Event) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  const baseClasses = cn(
    "inline-flex items-center rounded-md border font-medium transition-colors",
    sizeClasses[size],
    color || variantColors[variant],
    closable && "pr-1",
    onClick && "cursor-pointer hover:opacity-80",
    className
  );

  return onClick ? (
    <button
      type="button"
      className={baseClasses}
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label="Tag"
    >
      {Icon && <Icon className="mr-1 h-3 w-3" />}
      {children}
      {closable && (
        <button
          type="button"
          className="ml-1 inline-flex items-center rounded-full p-0.5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={handleClose}
          aria-label="Remove tag"
        >
          <svg
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </button>
  ) : (
    <span className={baseClasses}>
      {Icon && <Icon className="mr-1 h-3 w-3" />}
      {children}
      {closable && (
        <button
          type="button"
          className="ml-1 inline-flex items-center rounded-full p-0.5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={handleClose}
          aria-label="Remove tag"
        >
          <svg
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </span>
  );
}
