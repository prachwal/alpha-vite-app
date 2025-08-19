import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { signal } from '@preact/signals';

// Import translation files
import homeEN from '../locales/en/home.json';
import homePL from '../locales/pl/home.json';
import aboutEN from '../locales/en/about.json';
import aboutPL from '../locales/pl/about.json';
import settingsEN from '../locales/en/settings.json';
import settingsPL from '../locales/pl/settings.json';
import profileEN from '../locales/en/profile.json';
import profilePL from '../locales/pl/profile.json';
import commonEN from '../locales/en/common.json';
import commonPL from '../locales/pl/common.json';
import translationBrowserEN from '../locales/en/translationBrowser.json';
import translationBrowserPL from '../locales/pl/translationBrowser.json';

// Language signal for reactive updates
export const currentLanguage = signal('en');

// Translation resources
const resources = {
  en: {
    translation: {
      ...commonEN,
      // Page-specific translations
      pages: {
        common: commonEN,
        home: homeEN,
        about: aboutEN,
        settings: settingsEN,
        profile: profileEN,
        translationBrowser: translationBrowserEN,
      },
    },
  },
  pl: {
    translation: {
      ...commonPL,
      // Page-specific translations
      pages: {
        common: commonPL,
        home: homePL,
        about: aboutPL,
        settings: settingsPL,
        profile: profilePL,
        translationBrowser: translationBrowserPL,
      },
    },
  },
};

// Initialize i18n only in browser
export const initializeI18n = () => {
  if (typeof window === 'undefined') {
    console.log('[i18n] Skipping initialization - SSR environment');
    return Promise.resolve();
  }

  if (i18n.isInitialized) {
    console.log('[i18n] Already initialized');
    return Promise.resolve();
  }

  console.log('[i18n] Starting initialization...');

  return i18n
    .use(LanguageDetector)
    .init({
      resources,
      fallbackLng: 'en',
      debug: process.env.NODE_ENV === 'development',

      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
      },

      interpolation: {
        escapeValue: false, // Not needed for Preact
      },
    })
    .then(() => {
      // Update signal when language changes
      currentLanguage.value = i18n.language;

      // Listen for language changes
      i18n.on('languageChanged', (lng) => {
        currentLanguage.value = lng;
        console.log('[i18n] Language changed to:', lng);
      });

      console.log('[i18n] Initialized with language:', i18n.language);
    })
    .catch((error) => {
      console.error('[i18n] Failed to initialize:', error);
    });
};

// Change language function
export const changeLanguage = (lng: string) => {
  if (typeof window !== 'undefined') {
    if (i18n.isInitialized) {
      console.log('[i18n] Changing language to:', lng);
      i18n.changeLanguage(lng);
    } else {
      console.warn('[i18n] Cannot change language - i18n not initialized');
    }
  }
};

// Helper function to get translation from resources
const getTranslationFromResources = (
  key: string,
  language: 'en' | 'pl' = 'en'
): string => {
  const keys = key.split('.');
  let result: any = resources[language].translation;

  for (const k of keys) {
    if (result && typeof result === 'object' && result[k] !== undefined) {
      result = result[k];
    } else {
      return key;
    }
  }

  return typeof result === 'string' ? result : key;
};

// Translation function
export const t = (key: string, options?: any): string => {
  // SSR environment - use English fallback
  if (typeof window === 'undefined') {
    return getTranslationFromResources(key, 'en');
  }

  // i18n not initialized - use English fallback with warning
  if (!i18n.isInitialized) {
    console.warn('[i18n] Translation requested before initialization:', key);
    return getTranslationFromResources(key, 'en');
  }

  // Normal case - use i18n
  const result = i18n.t(key, options);

  // Handle different return types from i18n.t()
  if (typeof result === 'string') {
    return result;
  }

  // Handle array/object results by returning the key as fallback
  // This prevents [object Object] stringification issues
  if (result === null || result === undefined) {
    return key;
  }

  // For objects/arrays, return key instead of stringified object
  if (typeof result === 'object') {
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
