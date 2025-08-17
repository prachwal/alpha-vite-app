interface SectionCardProps {
  readonly title: string;
  readonly children: preact.ComponentChildren;
  readonly className?: string;
}

export function SectionCard({
  title,
  children,
  className = "",
}: SectionCardProps) {
  return (
    <div
      className={`bg-bg-surface rounded-lg shadow-md ${className}`}
      style={{ padding: "var(--spacing-lg)" }}
    >
      <h2
        className="text-2xl font-semibold text-text-primary"
        style={{ marginBottom: "var(--spacing-md)" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
