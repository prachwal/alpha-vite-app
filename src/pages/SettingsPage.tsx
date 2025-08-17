import { useEffect, useState } from "preact/hooks";
import {
  themeConfig,
  toggleDarkMode,
  updateTheme,
} from "../services/ThemeProvider";
import {
  currentLanguage,
  changeLanguage,
  usePageTranslations,
} from "../services/i18n";

export function SettingsPage() {
  const t = usePageTranslations("settings");
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

  const handleFontSizeChange = (fontSize: "sm" | "base" | "lg" | "xl") => {
    updateTheme({ fontSize });
    const debug = [
      `Theme mode: ${themeConfig.value.mode}`,
      `Font size: ${fontSize}`,
      `Font family: ${themeConfig.value.fontFamily}`,
      `Spacing: ${themeConfig.value.spacing}`,
      `Language: ${currentLanguage.value}`,
      `Timestamp: ${new Date().toLocaleString()}`,
    ];
    setDebugInfo(debug);
  };

  const handleFontFamilyChange = (fontFamily: "sans" | "mono") => {
    updateTheme({ fontFamily });
    const debug = [
      `Theme mode: ${themeConfig.value.mode}`,
      `Font size: ${themeConfig.value.fontSize}`,
      `Font family: ${fontFamily}`,
      `Spacing: ${themeConfig.value.spacing}`,
      `Language: ${currentLanguage.value}`,
      `Timestamp: ${new Date().toLocaleString()}`,
    ];
    setDebugInfo(debug);
  };

  return (
    <div className="max-w-4xl mx-auto" style="padding: var(--spacing-lg)">
      <h1
        className="text-3xl font-bold text-text-primary"
        style="margin-bottom: var(--spacing-xl)"
      >
        {t("title")}
      </h1>

      {/* Theme Settings */}
      <div
        className="bg-bg-surface rounded-lg shadow-md"
        style="padding: var(--spacing-lg); margin-bottom: var(--spacing-lg)"
      >
        <h2
          className="text-xl font-semibold text-text-primary"
          style="margin-bottom: var(--spacing-md)"
        >
          {t("themeSettings")}
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-text-muted">
              Current theme: {themeConfig.value.mode}
            </span>
            <button
              onClick={handleThemeToggle}
              className="bg-primary text-white rounded hover:bg-primary-hover transition-colors flex items-center"
              style="padding: var(--spacing-sm) var(--spacing-md); gap: var(--spacing-xs)"
            >
              {themeConfig.value.mode === "dark" ? (
                <span>☀️</span>
              ) : (
                <span>🌙</span>
              )}
              {t("toggleTheme")}
            </button>
          </div>

          {/* Font Family Controls */}
          <div className="mt-4">
            <h3
              className="text-lg font-medium text-text-primary"
              style="margin-bottom: var(--spacing-sm)"
            >
              Font Family
            </h3>
            <div className="flex" style="gap: var(--spacing-xs)">
              {(["sans", "mono"] as const).map((fontFamily) => (
                <button
                  key={fontFamily}
                  onClick={() => handleFontFamilyChange(fontFamily)}
                  className={`px-3 py-2 rounded transition-colors ${
                    themeConfig.value.fontFamily === fontFamily
                      ? "bg-primary text-white"
                      : "bg-bg-muted text-text-muted hover:bg-bg-muted-hover"
                  }`}
                >
                  {fontFamily === "sans" ? "Sans Serif" : "Monospace"}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size Controls */}
          <div className="mt-4">
            <h3
              className="text-lg font-medium text-text-primary"
              style="margin-bottom: var(--spacing-sm)"
            >
              Font Size
            </h3>
            <div className="flex" style="gap: var(--spacing-xs)">
              {(["sm", "base", "lg", "xl"] as const).map((fontSize) => (
                <button
                  key={fontSize}
                  onClick={() => handleFontSizeChange(fontSize)}
                  className={`px-3 py-2 rounded transition-colors ${
                    themeConfig.value.fontSize === fontSize
                      ? "bg-primary text-white"
                      : "bg-bg-muted text-text-muted hover:bg-bg-muted-hover"
                  }`}
                >
                  {fontSize}
                </button>
              ))}
            </div>
          </div>

          {/* Spacing Controls */}
          <div className="mt-4">
            <h3
              className="text-lg font-medium text-text-primary"
              style="margin-bottom: var(--spacing-sm)"
            >
              Spacing Controls
            </h3>
            <div className="flex" style="gap: var(--spacing-xs)">
              {(["compact", "normal", "spacious"] as const).map((spacing) => (
                <button
                  key={spacing}
                  onClick={() => handleSpacingChange(spacing)}
                  className={`px-3 py-2 rounded transition-colors ${
                    themeConfig.value.spacing === spacing
                      ? "bg-primary text-white"
                      : "bg-bg-muted text-text-muted hover:bg-bg-muted-hover"
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
      <div
        className="bg-bg-surface rounded-lg shadow-md"
        style="padding: var(--spacing-lg); margin-bottom: var(--spacing-lg)"
      >
        <h2
          className="text-xl font-semibold text-text-primary"
          style="margin-bottom: var(--spacing-md)"
        >
          {t("languageSettings")}
        </h2>

        <div className="flex items-center justify-between">
          <span className="text-text-muted">
            Current language:{" "}
            {currentLanguage.value === "en" ? "English" : "Polski"}
          </span>
          <button
            onClick={handleLanguageToggle}
            className="bg-secondary text-white rounded hover:bg-secondary-hover transition-colors flex items-center"
            style="padding: var(--spacing-sm) var(--spacing-md); gap: var(--spacing-xs)"
          >
            {currentLanguage.value === "en" ? <span>🇵🇱</span> : <span>🇺🇸</span>}
            {currentLanguage.value === "en"
              ? "Switch to Polish"
              : "Przełącz na angielski"}
          </button>
        </div>
      </div>

      {/* Debug Information */}
      <div
        className="bg-bg-muted rounded-lg"
        style="padding: var(--spacing-lg)"
      >
        <h2
          className="text-xl font-semibold text-text-primary"
          style="margin-bottom: var(--spacing-md)"
        >
          Debug Information
        </h2>

        <div className="space-y-2">
          {debugInfo.map((info, index) => (
            <div
              key={`debug-${info}-${index}`}
              className="text-sm text-text-muted font-mono"
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
          className="bg-bg-subtle text-white rounded hover:bg-bg-subtle-hover transition-colors"
          style="margin-top: var(--spacing-md); padding: var(--spacing-sm) var(--spacing-md)"
        >
          Refresh Debug Info
        </button>
      </div>
    </div>
  );
}
