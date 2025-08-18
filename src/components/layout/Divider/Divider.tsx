export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  thickness?: "thin" | "medium" | "thick";
  color?: "default" | "light" | "dark";
  dashed?: boolean;
  className?: string;
}

export function Divider({
  orientation = "horizontal",
  thickness = "thin",
  color = "default",
  dashed = false,
  className = "",
}: Readonly<DividerProps>) {
  const thicknessClasses = {
    thin: orientation === "horizontal" ? "h-px" : "w-px",
    medium: orientation === "horizontal" ? "h-0.5" : "w-0.5",
    thick: orientation === "horizontal" ? "h-1" : "w-1",
  };

  const colorClasses = {
    default: "bg-border",
    light: "bg-border-light",
    dark: "bg-border-dark",
  };

  const orientationClasses = {
    horizontal: "w-full",
    vertical: "h-full",
  };

  const dividerClasses = [
    orientationClasses[orientation],
    thicknessClasses[thickness],
    colorClasses[color],
    dashed ? "border-dashed border-current" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <hr className={dividerClasses} />;
}
