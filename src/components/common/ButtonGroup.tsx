interface ButtonGroupProps<T extends string> {
  options: readonly T[];
  currentValue: T;
  onChange: (value: T) => void;
  getLabel: (value: T) => string;
  layout?: "horizontal" | "vertical" | "grid";
  size?: "sm" | "md" | "lg";
  className?: string;
  gridColumns?: 2 | 3 | 4;
}

export function ButtonGroup<T extends string>({
  options,
  currentValue,
  onChange,
  getLabel,
  layout = "horizontal",
  size = "md",
  className = "",
  gridColumns = 3,
}: Readonly<ButtonGroupProps<T>>) {
  const layoutClasses = {
    horizontal: "flex flex-wrap",
    vertical: "flex flex-col",
    grid: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${gridColumns}`,
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2",
    lg: "px-4 py-3 text-lg",
  };

  const gapClasses = {
    horizontal: "gap-x-[var(--spacing-xs)] gap-y-[var(--spacing-xs)]",
    vertical: "gap-y-[var(--spacing-xs)]",
    grid: "gap-[var(--spacing-xs)]",
  };

  return (
    <div
      className={`${layoutClasses[layout]} ${gapClasses[layout]} ${className}`}
    >
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`${
            sizeClasses[size]
          } rounded transition-colors font-medium ${
            currentValue === option
              ? "bg-primary text-white shadow-md"
              : "bg-bg-muted text-text-muted hover:bg-bg-muted-hover hover:text-text-primary"
          }`}
        >
          {getLabel(option)}
        </button>
      ))}
    </div>
  );
}
