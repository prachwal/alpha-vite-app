import { useEffect, useState } from "preact/hooks";
import {
  themeConfig,
  toggleDarkMode,
  updateTheme,
} from "../services/ThemeProvider";
import { currentLanguage, changeLanguage, t } from "../services/i18n";

export function SettingsPage() {
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  // Reaktywne debugowanie - aktualizuj przy każdej zmianie
  useEffect(() => {
    const updateDebugInfo = () => {
      const debug = [
        `Theme mode: ${themeConfig.value.mode}`,
        `Font size: ${themeConfig.value.fontSize}`,
        `Font family: ${themeConfig.value.fontFamily}`,
        `Spacing: ${themeConfig.value.spacing}`,
        `Language: ${currentLanguage.value}`,
        `Timestamp: ${new Date().toLocaleString()}`,
      ];
      setDebugInfo(debug);
    };

    // Aktualizuj natychmiast
    updateDebugInfo();

    // Użyj efektów do nasłuchiwania na zmiany
    // Preact Signals automatycznie re-renderuje komponenty przy zmianie sygnałów
  }, [themeConfig.value, currentLanguage.value]);

  const handleThemeToggle = () => {
    console.log("[SettingsPage] Toggling theme...");
    toggleDarkMode();
  };

  const handleLanguageToggle = () => {
    const newLang = currentLanguage.value === "en" ? "pl" : "en";
    changeLanguage(newLang);
  };

  const handleSpacingChange = (spacing: "compact" | "normal" | "spacious") => {
    updateTheme({ spacing });
    const debug = [
      `Theme mode: ${themeConfig.value.mode}`,
      `Font size: ${themeConfig.value.fontSize}`,
      `Font family: ${themeConfig.value.fontFamily}`,
      `Spacing: ${themeConfig.value.spacing}`,
      `Language: ${currentLanguage.value}`,
      `Timestamp: ${new Date().toLocaleString()}`,
    ];
    setDebugInfo(debug);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {t("settings", "Settings")}
      </h1>

      {/* Theme Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {t("themeSettings", "Theme Settings")}
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">
              Current theme: {themeConfig.value.mode}
            </span>
            <button
              onClick={handleThemeToggle}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              {themeConfig.value.mode === "dark" ? (
                <span>☀️</span>
              ) : (
                <span>🌙</span>
              )}
              {t("toggleTheme", "Toggle Theme")}
            </button>
          </div>

          {/* Spacing Controls */}
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">
              Spacing Controls
            </h3>
            <div className="flex gap-2">
              {(["compact", "normal", "spacious"] as const).map((spacing) => (
                <button
                  key={spacing}
                  onClick={() => handleSpacingChange(spacing)}
                  className={`px-3 py-2 rounded transition-colors ${
                    themeConfig.value.spacing === spacing
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {spacing}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {t("languageSettings", "Language Settings")}
        </h2>

        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">
            Current language:{" "}
            {currentLanguage.value === "en" ? "English" : "Polski"}
          </span>
          <button
            onClick={handleLanguageToggle}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            {currentLanguage.value === "en" ? <span>🇵🇱</span> : <span>🇺🇸</span>}
            {currentLanguage.value === "en"
              ? "Switch to Polish"
              : "Przełącz na angielski"}
          </button>
        </div>
      </div>

      {/* Debug Information */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Debug Information
        </h2>

        <div className="space-y-2">
          {debugInfo.map((info, index) => (
            <div
              key={`debug-${info}-${index}`}
              className="text-sm text-gray-600 dark:text-gray-400 font-mono"
            >
              {info}
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            // Force refresh
            const debug = [
              `Theme mode: ${themeConfig.value.mode}`,
              `Font size: ${themeConfig.value.fontSize}`,
              `Font family: ${themeConfig.value.fontFamily}`,
              `Spacing: ${themeConfig.value.spacing}`,
              `Language: ${currentLanguage.value}`,
              `Timestamp: ${new Date().toLocaleString()}`,
            ];
            setDebugInfo(debug);
          }}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Refresh Debug Info
        </button>
      </div>
    </div>
  );
}
