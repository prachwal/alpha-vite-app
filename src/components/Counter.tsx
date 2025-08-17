import { signal } from "@preact/signals";

export const count = signal(0);
export const appName = signal(
  import.meta.env.VITE_APP_NAME || "Alpha Vite App"
);
