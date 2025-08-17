import { appName } from "./Counter";

export function AppTitle() {
  return (
    <h1
      className="text-4xl font-bold text-center text-text-primary"
      style="margin-bottom: var(--spacing-md)"
    >
      {appName.value}
    </h1>
  );
}
