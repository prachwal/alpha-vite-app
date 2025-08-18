// Type definitions for legacy components

export interface ButtonGroupProps<T extends string> {
  options: readonly T[];
  currentValue: T;
  onChange: (value: T) => void;
  getLabel: (value: T) => string;
  layout?: "horizontal" | "vertical" | "grid";
  size?: "sm" | "md" | "lg";
  className?: string;
  gridColumns?: 2 | 3 | 4;
}

export interface CheckIconProps {
  readonly className?: string;
}

export interface DebugInfoProps {
  readonly customData?: readonly string[];
}

export interface SectionCardProps {
  readonly title: string;
  readonly children: preact.ComponentChildren;
  readonly className?: string;
}

export interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
}

export interface SelectProps {
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
