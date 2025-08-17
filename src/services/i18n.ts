import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { signal } from "@preact/signals";

// Language signal for reactive updates
export const currentLanguage = signal("en");

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      navigation: "Navigation",
      home: "Home",
      about: "About",
      settings: "Settings",

      // Header
      appName: "Alpha Vite App",
      toggleTheme: "Toggle theme",

      // Home page
      welcome: "Welcome to your modern SSR Preact application",
      features: "Features",
      featureSSR: "Server-Side Rendering (SSR)",
      featureSignals: "Preact Signals for State Management",
      featureTailwind: "Tailwind CSS 4 for Styling",
      featureResponsive: "Responsive Design",
      featureTheme: "Dark/Light Theme Support",

      // API Tester
      apiTester: "API Tester",
      selectEndpoint: "Select Endpoint:",
      testAPI: "Test API",
      response: "Response:",

      // About page
      aboutTitle: "About Alpha Vite App",
      aboutDescription: "This is a modern web application built with:",
      technology: "Technology",

      // Settings page
      settingsTitle: "Settings",
      appearance: "Appearance",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      fontSize: "Font Size",
      small: "Small",
      normal: "Normal",
      large: "Large",
      extraLarge: "Extra Large",
      fontFamily: "Font Family",
      sansSerif: "Sans Serif",
      monospace: "Monospace",
      spacing: "Spacing",
      compact: "Compact",
      spacious: "Spacious",
      language: "Language",
      english: "English",
      polish: "Polish",

      // Counter
      count: "Count: {{count}}",
    },
  },
  pl: {
    translation: {
      // Navigation
      navigation: "Nawigacja",
      home: "Strona główna",
      about: "O aplikacji",
      settings: "Ustawienia",

      // Header
      appName: "Alpha Vite App",
      toggleTheme: "Przełącz motyw",

      // Home page
      welcome: "Witaj w Twojej nowoczesnej aplikacji SSR Preact",
      features: "Funkcje",
      featureSSR: "Renderowanie po stronie serwera (SSR)",
      featureSignals: "Preact Signals do zarządzania stanem",
      featureTailwind: "Tailwind CSS 4 do stylizacji",
      featureResponsive: "Responsywny design",
      featureTheme: "Obsługa motywów jasny/ciemny",

      // API Tester
      apiTester: "Tester API",
      selectEndpoint: "Wybierz endpoint:",
      testAPI: "Testuj API",
      response: "Odpowiedź:",

      // About page
      aboutTitle: "O Alpha Vite App",
      aboutDescription: "To jest nowoczesna aplikacja webowa zbudowana z:",
      technology: "Technologia",

      // Settings page
      settingsTitle: "Ustawienia",
      appearance: "Wygląd",
      theme: "Motyw",
      light: "Jasny",
      dark: "Ciemny",
      fontSize: "Rozmiar czcionki",
      small: "Mały",
      normal: "Normalny",
      large: "Duży",
      extraLarge: "Bardzo duży",
      fontFamily: "Rodzina czcionek",
      sansSerif: "Sans Serif",
      monospace: "Monospace",
      spacing: "Odstępy",
      compact: "Kompaktowe",
      spacious: "Przestronne",
      language: "Język",
      english: "Angielski",
      polish: "Polski",

      // Counter
      count: "Licznik: {{count}}",
    },
  },
};

// Initialize i18n only in browser
export const initializeI18n = () => {
  if (typeof window === "undefined") {
    console.log("[i18n] Skipping initialization - SSR environment");
    return Promise.resolve();
  }

  if (i18n.isInitialized) {
    console.log("[i18n] Already initialized");
    return Promise.resolve();
  }

  console.log("[i18n] Starting initialization...");

  return i18n
    .use(LanguageDetector)
    .init({
      resources,
      fallbackLng: "en",
      debug: process.env.NODE_ENV === "development",

      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
      },

      interpolation: {
        escapeValue: false, // Not needed for Preact
      },
    })
    .then(() => {
      // Update signal when language changes
      currentLanguage.value = i18n.language;

      // Listen for language changes
      i18n.on("languageChanged", (lng) => {
        currentLanguage.value = lng;
        console.log("[i18n] Language changed to:", lng);
      });

      console.log("[i18n] Initialized with language:", i18n.language);
    })
    .catch((error) => {
      console.error("[i18n] Failed to initialize:", error);
    });
};

// Change language function
export const changeLanguage = (lng: string) => {
  if (typeof window !== "undefined") {
    if (i18n.isInitialized) {
      console.log("[i18n] Changing language to:", lng);
      i18n.changeLanguage(lng);
    } else {
      console.warn("[i18n] Cannot change language - i18n not initialized");
    }
  }
};

// Translation function
export const t = (key: string, options?: any) => {
  if (typeof window === "undefined") {
    // SSR fallback - return the key or use English fallback
    const enTranslation =
      resources.en.translation[key as keyof typeof resources.en.translation];
    return enTranslation || key;
  }

  if (!i18n.isInitialized) {
    console.warn("[i18n] Translation requested before initialization:", key);
    const enTranslation =
      resources.en.translation[key as keyof typeof resources.en.translation];
    return enTranslation || key;
  }

  return i18n.t(key, options);
};

export default i18n;
