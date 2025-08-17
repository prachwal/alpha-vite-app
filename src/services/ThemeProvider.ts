import { signal, effect } from "@preact/signals";

export interface ThemeConfig {
  mode: "light" | "dark";
  fontSize: "sm" | "base" | "lg" | "xl";
  fontFamily: "sans" | "mono";
  spacing: "compact" | "normal" | "spacious";
}

const defaultTheme: ThemeConfig = {
  mode: "light",
  fontSize: "base",
  fontFamily: "sans",
  spacing: "normal",
};

const loadThemeFromStorage = (): ThemeConfig => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return defaultTheme;
  }

  try {
    const stored = localStorage.getItem("theme-config");
    if (stored) {
      return { ...defaultTheme, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.warn("Failed to load theme from localStorage:", error);
  }

  return defaultTheme;
};

export const themeConfig = signal<ThemeConfig>(defaultTheme);

let effectInitialized = false;

// Initialize theme config and effects only on client side
export const initializeTheme = () => {
  if (effectInitialized || typeof window === "undefined") {
    console.log(
      "[ThemeProvider] Skipping initialization - already initialized or SSR"
    );
    return;
  }

  console.log("[ThemeProvider] Initializing theme...");

  // Load theme from storage
  const loadedTheme = loadThemeFromStorage();
  themeConfig.value = loadedTheme;
  console.log("[ThemeProvider] Loaded theme from storage:", loadedTheme);

  // Save to localStorage whenever theme changes
  effect(() => {
    // Only run in browser environment
    if (typeof window === "undefined" || typeof document === "undefined") {
      console.warn("[ThemeProvider] Effect running in non-browser environment");
      return;
    }

    console.log("[ThemeProvider] Theme changed:", themeConfig.value);

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme-config", JSON.stringify(themeConfig.value));
      console.log("[ThemeProvider] Saved theme to localStorage");
    }

    // Apply theme classes to document
    const root = document.documentElement;
    if (!root) {
      console.error("[ThemeProvider] Document root not found");
      return;
    }

    // Mode
    const isDark = themeConfig.value.mode === "dark";
    root.classList.toggle("dark", isDark);
    console.log("[ThemeProvider] Applied dark mode:", isDark);

    // Font size
    root.classList.remove("text-sm", "text-base", "text-lg", "text-xl");
    root.classList.add(`text-${themeConfig.value.fontSize}`);

    // Font family
    root.classList.remove("font-sans", "font-mono");
    root.classList.add(`font-${themeConfig.value.fontFamily}`);

    // Spacing
    root.classList.remove(
      "spacing-compact",
      "spacing-normal",
      "spacing-spacious"
    );
    root.classList.add(`spacing-${themeConfig.value.spacing}`);
  });

  effectInitialized = true;
  console.log("[ThemeProvider] Theme initialization complete");
};

export const updateTheme = (updates: Partial<ThemeConfig>) => {
  themeConfig.value = { ...themeConfig.value, ...updates };
};

export const toggleDarkMode = () => {
  const newMode = themeConfig.value.mode === "light" ? "dark" : "light";
  console.log(
    "[ThemeProvider] Toggling theme from",
    themeConfig.value.mode,
    "to",
    newMode
  );
  updateTheme({ mode: newMode });
};
