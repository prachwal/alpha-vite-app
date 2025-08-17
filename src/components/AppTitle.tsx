import { appName } from "./Counter";

export function AppTitle() {
  return (
    <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
      {appName.value}
    </h1>
  );
}
