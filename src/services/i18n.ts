import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { signal } from "@preact/signals";

// Import translation files
import homeEN from "../locales/en/home.json";
import homePL from "../locales/pl/home.json";
import aboutEN from "../locales/en/about.json";
import aboutPL from "../locales/pl/about.json";
import settingsEN from "../locales/en/settings.json";
import settingsPL from "../locales/pl/settings.json";

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
      toggleSidebar: "Toggle sidebar",
      homePage: "Home",
      aboutPage: "About",
      settingsPage: "Settings",

      // Header
      appName: "Alpha Vite App",
      toggleTheme: "Toggle theme",

      // API Tester
      apiTester: "API Tester",
      selectEndpoint: "Select Endpoint:",
      testAPI: "Test API",
      response: "Response:",

      // Counter
      count: "Count: {{count}}",

      // Page-specific translations
      pages: {
        home: homeEN,
        about: aboutEN,
        settings: settingsEN,
      },
    },
  },
  pl: {
    translation: {
      // Navigation
      navigation: "Nawigacja",
      home: "Strona główna",
      about: "O aplikacji",
      settings: "Ustawienia",
      toggleSidebar: "Przełącz panel boczny",
      homePage: "Strona główna",
      aboutPage: "O aplikacji",
      settingsPage: "Ustawienia",

      // Header
      appName: "Alpha Vite App",
      toggleTheme: "Przełącz motyw",

      // API Tester
      apiTester: "Tester API",
      selectEndpoint: "Wybierz endpoint:",
      testAPI: "Testuj API",
      response: "Odpowiedź:",

      // Counter
      count: "Licznik: {{count}}",

      // Page-specific translations
      pages: {
        home: homePL,
        about: aboutPL,
        settings: settingsPL,
      },
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

// Helper function to get translation from resources
const getTranslationFromResources = (
  key: string,
  language: "en" | "pl" = "en"
): string => {
  const keys = key.split(".");
  let result: any = resources[language].translation;

  for (const k of keys) {
    if (result && typeof result === "object" && result[k] !== undefined) {
      result = result[k];
    } else {
      return key;
    }
  }

  return typeof result === "string" ? result : key;
};

// Translation function
export const t = (key: string, options?: any): string => {
  // SSR environment - use English fallback
  if (typeof window === "undefined") {
    return getTranslationFromResources(key, "en");
  }

  // i18n not initialized - use English fallback with warning
  if (!i18n.isInitialized) {
    console.warn("[i18n] Translation requested before initialization:", key);
    return getTranslationFromResources(key, "en");
  }

  // Normal case - use i18n
  const result = i18n.t(key, options);

  // Handle different return types from i18n.t()
  if (typeof result === "string") {
    return result;
  }

  // Handle array/object results by returning the key as fallback
  // This prevents [object Object] stringification issues
  if (result === null || result === undefined) {
    return key;
  }

  // For objects/arrays, return key instead of stringified object
  if (typeof result === "object") {
    console.warn(
      `[i18n] Translation for key "${key}" returned object/array instead of string`
    );
    return key;
  }

  // Handle other primitive types (number, boolean)
  return String(result);
};

// Helper function for page-specific translations
export const usePageTranslations = (page: string) => {
  return (key: string, options?: any) => {
    return t(`pages.${page}.${key}`, options);
  };
};

export default i18n;
