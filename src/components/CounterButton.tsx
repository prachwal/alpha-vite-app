import { count } from "./Counter";

export function CounterButton() {
  return (
    <button
      onClick={() => count.value++}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Count: {count.value}
    </button>
  );
}
