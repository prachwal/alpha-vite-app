import { signal, effect } from '@preact/signals';

export interface ThemeConfig {
  mode: 'light' | 'dark';
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  fontFamily: 'sans' | 'mono';
  spacing: 'compact' | 'normal' | 'spacious';
}

const defaultTheme: ThemeConfig = {
  mode: 'light',
  fontSize: 'base',
  fontFamily: 'sans',
  spacing: 'normal',
};

const loadThemeFromStorage = (): ThemeConfig => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    console.log(
      '[ThemeProvider] Server-side or no localStorage, using default theme'
    );
    return defaultTheme;
  }

  try {
    const stored = localStorage.getItem('theme-config');
    console.log('[ThemeProvider] Raw localStorage value:', stored);

    if (stored) {
      const parsed = JSON.parse(stored);
      console.log('[ThemeProvider] Parsed theme from localStorage:', parsed);
      const merged = { ...defaultTheme, ...parsed };
      console.log('[ThemeProvider] Merged theme:', merged);
      return merged;
    }
  } catch (error) {
    console.error(
      '[ThemeProvider] Failed to load theme from localStorage:',
      error
    );
  }

  console.log('[ThemeProvider] No stored theme, using default:', defaultTheme);
  return defaultTheme;
};

// Initialize with theme from localStorage on client, default on server
const initialTheme =
  typeof window !== 'undefined' ? loadThemeFromStorage() : defaultTheme;
export const themeConfig = signal<ThemeConfig>(initialTheme);

// This effect is the single source of truth for applying the theme to the DOM.
// It runs whenever themeConfig changes.
effect(() => {
  console.log(
    `[ThemeProvider] EFFECT TRIGGERED with theme:`,
    themeConfig.value
  );

  // Guard against running on the server.
  if (typeof window === 'undefined') {
    console.log('[ThemeProvider] Skipping effect - server side');
    return;
  }

  // Defer DOM mutations to run after Preact's hydration phase.
  queueMicrotask(() => {
    const root = document.documentElement;
    const config = themeConfig.value;

    console.log(`[ThemeProvider] Applying theme in microtask:`, config);
    console.log(
      `[ThemeProvider] Current localStorage before update:`,
      localStorage.getItem('theme-config')
    );

    // 1. Set dark mode class
    if (config.mode === 'dark') {
      root.classList.add('dark');
      console.log('[ThemeProvider] Added dark class');
    } else {
      root.classList.remove('dark');
      console.log('[ThemeProvider] Removed dark class');
    }

    // 2. Clean up old utility classes before adding new ones
    const newClasses = (root.className || '')
      .split(' ')
      .filter(
        (c) =>
          c &&
          !c.startsWith('font-') &&
          !c.startsWith('spacing-') &&
          !c.startsWith('text-')
      );

    // 3. Add new classes for font family, spacing and font size
    newClasses.push(`font-${config.fontFamily}`);
    newClasses.push(`spacing-${config.spacing}`);
    newClasses.push(`text-${config.fontSize}`);
    root.className = newClasses.join(' ');
    console.log(`[ThemeProvider] Updated classes:`, root.className);

    // 5. Persist to localStorage
    try {
      const serialized = JSON.stringify(config);
      console.log(`[ThemeProvider] Saving to localStorage:`, serialized);
      localStorage.setItem('theme-config', serialized);

      // Verify the save
      const saved = localStorage.getItem('theme-config');
      console.log(`[ThemeProvider] Verified saved theme:`, saved);

      if (saved !== serialized) {
        console.error(
          '[ThemeProvider] MISMATCH: Saved theme differs from what we tried to save!'
        );
      } else {
        console.log('[ThemeProvider] Theme successfully saved to localStorage');
      }
    } catch (error) {
      console.error(
        '[ThemeProvider] Failed to save theme to localStorage:',
        error
      );
    }
  });
});

// Initialize theme config on the client side - now just a no-op since we initialize immediately
export const initializeTheme = () => {
  // Theme is already initialized with localStorage value
};

export const updateTheme = (updates: Partial<ThemeConfig>) => {
  console.log(`[ThemeProvider] updateTheme called with:`, updates);
  console.log(
    `[ThemeProvider] Current theme before update:`,
    themeConfig.value
  );

  // Create a new object to ensure the signal update is detected
  const newTheme = { ...themeConfig.value, ...updates };
  console.log(`[ThemeProvider] New theme will be:`, newTheme);

  themeConfig.value = newTheme;

  // Force save to localStorage immediately
  if (typeof window !== 'undefined') {
    try {
      const serialized = JSON.stringify(newTheme);
      console.log(`[ThemeProvider] Direct save to localStorage:`, serialized);
      localStorage.setItem('theme-config', serialized);

      // Verify the save
      const saved = localStorage.getItem('theme-config');
      console.log(`[ThemeProvider] Verified direct save:`, saved);

      if (saved !== serialized) {
        console.error('[ThemeProvider] DIRECT SAVE MISMATCH!');
      } else {
        console.log('[ThemeProvider] Direct save successful');
      }
    } catch (error) {
      console.error('[ThemeProvider] Failed direct save:', error);
    }
  }

  console.log(`[ThemeProvider] Theme updated successfully`);
};

export const toggleDarkMode = () => {
  console.log(`[ThemeProvider] toggleDarkMode called`);
  console.log(`[ThemeProvider] Current mode:`, themeConfig.value.mode);

  const newMode = themeConfig.value.mode === 'light' ? 'dark' : 'light';
  console.log(`[ThemeProvider] New mode will be:`, newMode);

  updateTheme({ mode: newMode });
};
