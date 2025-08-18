import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/preact";
import "@testing-library/jest-dom";

// Mock i18n
vi.mock("@services/i18n", () => ({
  t: (key: string) => {
    const translations: Record<string, string> = {
      // Navigation
      navigation: "Nawigacja",
      home: "Strona główna",
      about: "O aplikacji",
      settings: "Ustawienia",

      // Settings page
      "settings.title": "Ustawienia",
      themeSettings: "Ustawienia motywu",
      languageSettings: "Ustawienia języka",
      toggleTheme: "Przełącz motyw",
      currentTheme: "Aktualny motyw",
      currentLanguage: "Aktualny język",
      switchToEnglish: "Przełącz na angielski",
      switchToPolish: "Przełącz na polski",

      // Spacing
      spacing: "Odstępy",
      compact: "Kompaktowe",
      normal: "Normalne",
      spacious: "Rozległe",

      // Home page
      welcome: "Witamy w Alpha Vite App",
      features: "Funkcje",
      featureSSR: "Server-Side Rendering",
      featureSignals: "Reaktywne sygnały",
      featureTailwind: "Tailwind CSS",
      featureResponsive: "Responsywny design",
      featureTheme: "Ciemny motyw",
    };
    return translations[key] || key;
  },
  initializeI18n: vi.fn().mockResolvedValue(undefined),
  changeLanguage: vi.fn(),
  currentLanguage: { value: "pl" },
}));

// Mock ThemeProvider
vi.mock("@services/ThemeProvider", () => ({
  themeConfig: {
    value: {
      mode: "light",
      fontSize: "base",
      spacing: "normal",
    },
  },
  updateTheme: vi.fn(),
  toggleDarkMode: vi.fn(),
  initializeTheme: vi.fn(),
}));

// Runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;

// Add CSS custom properties for testing
const style = document.createElement("style");
style.textContent = `
  :root {
    --color-primary: #007bff;
    --color-secondary: #6c757d;
    --color-background: #ffffff;
    --color-surface: #f8f9fa;
    --color-text: #212529;
    --color-text-secondary: #6c757d;
    --color-border: #dee2e6;
    --color-success: #28a745;
    --color-warning: #ffc107;
    --color-error: #dc3545;
    --color-info: #17a2b8;
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
    --font-size-4xl: 2.25rem;
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    --border-radius-sm: 0.125rem;
    --border-radius-md: 0.375rem;
    --border-radius-lg: 0.5rem;
    --border-radius-xl: 0.75rem;
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;
document.head.appendChild(style);
