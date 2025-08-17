interface ButtonGroupProps<T extends string> {
  options: readonly T[];
  currentValue: T;
  onChange: (value: T) => void;
  getLabel: (value: T) => string;
}

export function ButtonGroup<T extends string>({
  options,
  currentValue,
  onChange,
  getLabel,
}: Readonly<ButtonGroupProps<T>>) {
  return (
    <div className="flex" style={{ gap: "var(--spacing-xs)" }}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-3 py-2 rounded transition-colors ${
            currentValue === option
              ? "bg-primary text-white"
              : "bg-bg-muted text-text-muted hover:bg-bg-muted-hover"
          }`}
        >
          {getLabel(option)}
        </button>
      ))}
    </div>
  );
}
