import { h } from "preact";

export interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "spinner" | "dots" | "bars" | "pulse";
  color?: "primary" | "secondary" | "accent" | "neutral";
  className?: string;
  label?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

const colorClasses = {
  primary: "text-blue-600",
  secondary: "text-green-600",
  accent: "text-purple-600",
  neutral: "text-gray-600",
};

const Spinner = ({ size, color }: { size: string; color: string }) => (
  <svg
    className={`animate-spin ${size} ${color}`}
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
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const Dots = ({ size, color }: { size: string; color: string }) => (
  <div className={`flex space-x-1 ${size === "h-4 w-4" ? "space-x-0.5" : ""}`}>
    <div
      className={`${size} ${color} rounded-full animate-bounce`}
      style={{ animationDelay: "0ms" }}
    />
    <div
      className={`${size} ${color} rounded-full animate-bounce`}
      style={{ animationDelay: "150ms" }}
    />
    <div
      className={`${size} ${color} rounded-full animate-bounce`}
      style={{ animationDelay: "300ms" }}
    />
  </div>
);

const Bars = ({ size, color }: { size: string; color: string }) => (
  <div className="flex space-x-1">
    <div
      className={`${size} ${color} rounded animate-pulse`}
      style={{ animationDelay: "0ms" }}
    />
    <div
      className={`${size} ${color} rounded animate-pulse`}
      style={{ animationDelay: "200ms" }}
    />
    <div
      className={`${size} ${color} rounded animate-pulse`}
      style={{ animationDelay: "400ms" }}
    />
  </div>
);

const Pulse = ({ size, color }: { size: string; color: string }) => (
  <div className={`${size} ${color} rounded-full animate-pulse`} />
);

const variants = {
  spinner: Spinner,
  dots: Dots,
  bars: Bars,
  pulse: Pulse,
};

export function Loading({
  size = "md",
  variant = "spinner",
  color = "primary",
  className = "",
  label,
}: LoadingProps) {
  const sizeClass = sizeClasses[size];
  const colorClass = colorClasses[color];
  const Component = variants[variant];

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      role="status"
      aria-label={label || "Loading"}
    >
      <Component size={sizeClass} color={colorClass} />
      {label && <span className="ml-2 text-sm text-gray-600">{label}</span>}
    </div>
  );
}

// Convenience components
export const LoadingSpinner = (props: Omit<LoadingProps, "variant">) => (
  <Loading {...props} variant="spinner" />
);

export const LoadingDots = (props: Omit<LoadingProps, "variant">) => (
  <Loading {...props} variant="dots" />
);

export const LoadingBars = (props: Omit<LoadingProps, "variant">) => (
  <Loading {...props} variant="bars" />
);

export const LoadingPulse = (props: Omit<LoadingProps, "variant">) => (
  <Loading {...props} variant="pulse" />
);
