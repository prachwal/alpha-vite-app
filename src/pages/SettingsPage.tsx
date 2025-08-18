import { useEffect, useState } from "preact/hooks";
import {
  themeConfig,
  toggleDarkMode,
  updateTheme,
} from "@services/ThemeProvider";
import {
  currentLanguage,
  changeLanguage,
  usePageTranslations,
} from "@services/i18n";
import { ButtonGroup } from "@components/legacy/ButtonGroup";

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <span className="text-text-muted break-words">
              {t("currentTheme")}: {String(t(String(themeConfig.value.mode)))}
            </span>
            <button
              onClick={handleThemeToggle}
              className="bg-primary text-white rounded hover:bg-primary-hover transition-colors flex items-center self-start sm:self-center"
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
              {t("fontFamily")}
            </h3>
            <ButtonGroup
              options={["sans", "mono"] as const}
              currentValue={themeConfig.value.fontFamily}
              onChange={handleFontFamilyChange}
              getLabel={(value) =>
                String(t(value === "sans" ? "sansSerif" : "monospace"))
              }
              layout="grid"
              size="md"
              gridColumns={2}
              className="w-full sm:w-auto"
            />
          </div>

          {/* Font Size Controls */}
          <div className="mt-4">
            <h3
              className="text-lg font-medium text-text-primary"
              style="margin-bottom: var(--spacing-sm)"
            >
              {t("fontSize")}
            </h3>
            <ButtonGroup
              options={["sm", "base", "lg", "xl"] as const}
              currentValue={themeConfig.value.fontSize}
              onChange={handleFontSizeChange}
              getLabel={(value) => String(t(String(value)))}
              layout="grid"
              size="md"
              gridColumns={4}
              className="w-full sm:w-auto"
            />
          </div>

          {/* Spacing Controls */}
          <div className="mt-4">
            <h3
              className="text-lg font-medium text-text-primary"
              style="margin-bottom: var(--spacing-sm)"
            >
              {t("spacing")}
            </h3>
            <ButtonGroup
              options={["compact", "normal", "spacious"] as const}
              currentValue={themeConfig.value.spacing}
              onChange={handleSpacingChange}
              getLabel={(value) => String(t(String(value)))}
              layout="grid"
              size="md"
              gridColumns={3}
              className="w-full sm:w-auto"
            />
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
            {t("currentLanguage")}:{" "}
            {currentLanguage.value === "en"
              ? String(t("english"))
              : String(t("polish"))}
          </span>
          <button
            onClick={handleLanguageToggle}
            className="bg-secondary text-white rounded hover:bg-secondary-hover transition-colors flex items-center"
            style="padding: var(--spacing-sm) var(--spacing-md); gap: var(--spacing-xs)"
          >
            {currentLanguage.value === "en" ? <span>🇵🇱</span> : <span>🇺🇸</span>}
            {currentLanguage.value === "en"
              ? String(t("switchToPolish"))
              : String(t("switchToEnglish"))}
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
          {t("debugInformation")}
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
          {t("refreshDebugInfo")}
        </button>
      </div>
    </div>
  );
}
