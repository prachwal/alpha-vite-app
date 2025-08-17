import { apiClient, apiState } from "../services/ApiClient";
import { signal } from "@preact/signals";

const selectedEndpoint = signal<string>("/api/health");
const customName = signal<string>("");

export function ApiTester() {
  const handleTest = async () => {
    try {
      switch (selectedEndpoint.value) {
        case "/api/health":
          await apiClient.getHealth();
          break;
        case "/api/hello":
          await apiClient.getHello(customName.value || undefined);
          break;
        case "/api/test":
          await apiClient.getTest();
          break;
        case "/api/info":
          await apiClient.getInfo();
          break;
      }
    } catch (error) {
      console.error("API test failed:", error);
    }
  };

  const currentState = apiState.value[selectedEndpoint.value] || {
    data: null,
    loading: false,
    error: null,
  };

  return (
    <div
      className="bg-bg-surface rounded-lg shadow-md"
      style="padding: var(--spacing-lg)"
    >
      <h3
        className="text-xl font-semibold text-text-primary"
        style="margin-bottom: var(--spacing-lg)"
      >
        API Tester
      </h3>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="endpoint-select"
            className="block text-sm font-medium mb-2 text-text-muted"
          >
            Select Endpoint:
          </label>
          <select
            id="endpoint-select"
            value={selectedEndpoint.value}
            onChange={(e) =>
              (selectedEndpoint.value = (e.target as HTMLSelectElement).value)
            }
            className="w-full p-2 border border-border-primary rounded-md bg-bg-surface text-text-primary"
          >
            <option value="/api/health">Health Check</option>
            <option value="/api/hello">Hello</option>
            <option value="/api/test">Test</option>
            <option value="/api/info">Info</option>
          </select>
        </div>

        {selectedEndpoint.value === "/api/hello" && (
          <div>
            <label
              htmlFor="custom-name-input"
              className="block text-sm font-medium text-text-muted"
              style="margin-bottom: var(--spacing-sm)"
            >
              Name (optional):
            </label>
            <input
              id="custom-name-input"
              type="text"
              value={customName.value}
              onInput={(e) =>
                (customName.value = (e.target as HTMLInputElement).value)
              }
              className="w-full p-2 border border-border-primary rounded-md bg-bg-surface text-text-primary"
              placeholder="Enter name..."
            />
          </div>
        )}

        <button
          onClick={handleTest}
          disabled={currentState.loading}
          className="px-4 py-2 bg-primary hover:bg-primary-hover disabled:bg-primary-disabled text-white rounded-md transition-colors"
        >
          {currentState.loading ? "Testing..." : "Test API"}
        </button>

        {currentState.error && (
          <div className="p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-md">
            <p className="text-red-700 dark:text-red-300 text-sm">
              Error: {currentState.error}
            </p>
          </div>
        )}

        {currentState.data && (
          <div className="p-3 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-md">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Response:
            </h4>
            <pre className="text-sm text-green-700 dark:text-green-300 overflow-x-auto">
              {JSON.stringify(currentState.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
