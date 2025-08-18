/**
 * @fileoverview Switch component for boolean input with visual toggle state
 *
 * Provides an accessible, animated switch/toggle control that can be used
 * as an alternative to checkboxes for boolean values. Includes proper
 * focus management, keyboard navigation, and visual feedback.
 *
 * @version 1.0.0
 * @since 2025-08-18
 */

import { JSX } from "preact";
import { useState, useId } from "preact/hooks";
import { cn } from "../../../utils/cn";

export interface SwitchProps {
  /** Whether the switch is checked/on */
  checked?: boolean;
  /** Default checked state for uncontrolled component */
  defaultChecked?: boolean;
  /** Callback fired when switch state changes */
  onChange?: (checked: boolean) => void;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Loading state - shows spinner */
  loading?: boolean;
  /** Label text */
  children?: JSX.Element | string;
  /** Additional CSS classes */
  className?: string;
  /** HTML name attribute */
  name?: string;
  /** HTML id attribute */
  id?: string;
  /** ARIA label for accessibility */
  "aria-label"?: string;
  /** ARIA labelled by reference */
  "aria-labelledby"?: string;
  /** ARIA described by reference */
  "aria-describedby"?: string;
}

const switchSizes = {
  sm: {
    track: "w-8 h-4",
    thumb: "w-3 h-3",
    translate: "translate-x-4",
    text: "text-xs",
  },
  md: {
    track: "w-10 h-5",
    thumb: "w-4 h-4",
    translate: "translate-x-5",
    text: "text-sm",
  },
  lg: {
    track: "w-12 h-6",
    thumb: "w-5 h-5",
    translate: "translate-x-6",
    text: "text-base",
  },
};

/**
 * Switch component for boolean input with visual toggle state
 */
export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  size = "md",
  loading = false,
  children,
  className = "",
  name,
  id: providedId,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
}: Readonly<SwitchProps>) {
  const generatedId = useId();
  const id = providedId || generatedId;

  // Handle controlled vs uncontrolled state
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = () => {
    if (disabled || loading) return;

    const newChecked = !checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      handleChange();
    }
  };

  const sizeConfig = switchSizes[size];

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        disabled={disabled}
        onClick={handleChange}
        onKeyDown={handleKeyDown}
        className={cn(
          // Base styles
          "relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",

          // Size
          sizeConfig.track,

          // State-based colors
          checked
            ? "bg-blue-600 dark:bg-blue-500"
            : "bg-gray-200 dark:bg-gray-700",

          // Disabled state
          disabled && "opacity-50 cursor-not-allowed",

          // Loading state
          loading && "cursor-wait"
        )}
        id={id}
        name={name}
      >
        {/* Track background when checked */}
        <span
          className={cn(
            "absolute inset-0 rounded-full transition-opacity duration-200",
            checked ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Thumb */}
        <span
          className={cn(
            // Base thumb styles
            "pointer-events-none relative inline-block rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200",

            // Size
            sizeConfig.thumb,

            // Position based on checked state
            checked ? sizeConfig.translate : "translate-x-0",

            // Center vertically
            "top-1/2 -translate-y-1/2 left-0.5"
          )}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 border border-gray-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </span>
      </button>

      {/* Label */}
      {children && (
        <label
          htmlFor={id}
          className={cn(
            "cursor-pointer select-none",
            sizeConfig.text,
            "text-gray-900 dark:text-gray-100",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {children}
        </label>
      )}
    </div>
  );
}
