import { count } from "./Counter";

export function CounterButton() {
  return (
    <button
      onClick={() => count.value++}
      className="bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
      style="padding: var(--spacing-sm) var(--spacing-md)"
    >
      Count: {count.value}
    </button>
  );
}
