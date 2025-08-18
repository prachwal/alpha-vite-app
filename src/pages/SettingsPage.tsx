import { useEffect, useState } from 'preact/hooks';
import {
  themeConfig,
  toggleDarkMode,
  updateTheme,
} from '@services/ThemeProvider';
import {
  currentLanguage,
  changeLanguage,
  usePageTranslations,
} from '@services/i18n';
import { Button, RadioGroup } from '@components/form';

export function SettingsPage() {
  const t = usePageTranslations('settings');
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
  }, [themeConfig.value, currentLanguage.value]);

  const handleThemeToggle = () => {
    console.log('[SettingsPage] Toggling theme...');
    toggleDarkMode();
  };

  const handleLanguageToggle = () => {
    const newLang = currentLanguage.value === 'en' ? 'pl' : 'en';
    changeLanguage(newLang);
  };

  const handleSpacingChange = (spacing: string) => {
    const validSpacings = ['compact', 'normal', 'spacious'] as const;
    if (validSpacings.includes(spacing as any)) {
      updateTheme({ spacing: spacing as 'compact' | 'normal' | 'spacious' });
    }
  };

  const handleFontSizeChange = (fontSize: string) => {
    const validFontSizes = ['sm', 'base', 'lg', 'xl'] as const;
    if (validFontSizes.includes(fontSize as any)) {
      updateTheme({ fontSize: fontSize as 'sm' | 'base' | 'lg' | 'xl' });
    }
  };

  const handleFontFamilyChange = (fontFamily: string) => {
    const validFontFamilies = ['sans', 'mono'] as const;
    if (validFontFamilies.includes(fontFamily as any)) {
      updateTheme({ fontFamily: fontFamily as 'sans' | 'mono' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto" style="padding: var(--spacing-lg)">
      <h1
        className="text-3xl font-bold text-text-primary"
        style="margin-bottom: var(--spacing-xl)"
      >
        {t('title')}
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
          {t('themeSettings')}
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <span className="text-text-muted break-words">
              {t('currentTheme')}:{' '}
              {t(String(themeConfig.value.mode)) ||
                String(themeConfig.value.mode)}
            </span>
            <Button onClick={handleThemeToggle} variant="primary" size="md">
              {themeConfig.value.mode === 'dark' ? '☀️' : '🌙'}{' '}
              {t('toggleTheme')}
            </Button>
          </div>

          {/* Font Family Controls */}
          <div className="mt-4">
            <h3
              className="text-lg font-medium text-text-primary"
              style="margin-bottom: var(--spacing-sm)"
            >
              {t('fontFamily')}
            </h3>
            <RadioGroup
              name="fontFamily"
              value={themeConfig.value.fontFamily}
              onChange={handleFontFamilyChange}
              options={[
                { value: 'sans', label: t('sansSerif') || 'Sans Serif' },
                { value: 'mono', label: t('monospace') || 'Monospace' },
              ]}
              layout="horizontal"
            />
          </div>

          {/* Font Size Controls */}
          <div className="mt-4">
            <h3
              className="text-lg font-medium text-text-primary"
              style="margin-bottom: var(--spacing-sm)"
            >
              {t('fontSize')}
            </h3>
            <RadioGroup
              name="fontSize"
              value={themeConfig.value.fontSize}
              onChange={handleFontSizeChange}
              options={[
                { value: 'sm', label: t('sm') || 'Small' },
                { value: 'base', label: t('base') || 'Base' },
                { value: 'lg', label: t('lg') || 'Large' },
                { value: 'xl', label: t('xl') || 'Extra Large' },
              ]}
              layout="horizontal"
            />
          </div>

          {/* Spacing Controls */}
          <div className="mt-4">
            <h3
              className="text-lg font-medium text-text-primary"
              style="margin-bottom: var(--spacing-sm)"
            >
              {t('spacing')}
            </h3>
            <RadioGroup
              name="spacing"
              value={themeConfig.value.spacing}
              onChange={handleSpacingChange}
              options={[
                { value: 'compact', label: t('compact') || 'Compact' },
                { value: 'normal', label: t('normal') || 'Normal' },
                { value: 'spacious', label: t('spacious') || 'Spacious' },
              ]}
              layout="horizontal"
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
          {t('languageSettings')}
        </h2>

        <div className="flex items-center justify-between">
          <span className="text-text-muted">
            {t('currentLanguage')}:{' '}
            {currentLanguage.value === 'en'
              ? t('english') || 'English'
              : t('polish') || 'Polish'}
          </span>
          <Button onClick={handleLanguageToggle} variant="secondary" size="md">
            {currentLanguage.value === 'en' ? '🇵🇱' : '🇺🇸'}{' '}
            {currentLanguage.value === 'en'
              ? t('switchToPolish') || 'Switch to Polish'
              : t('switchToEnglish') || 'Switch to English'}
          </Button>
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
          {t('debugInformation')}
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

        <Button
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
          variant="secondary"
          size="sm"
          className="mt-4"
        >
          {t('refreshDebugInfo')}
        </Button>
      </div>
    </div>
  );
}
