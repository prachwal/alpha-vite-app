import { signal } from "@preact/signals";

// Initialize with SSR-safe defaults
export const sidebarOpen = signal(false);
export const currentBreakpoint = signal<"mobile" | "tablet" | "desktop">(
  "desktop"
);
export const isHydrated = signal(false);

// Check screen size and update breakpoint
const updateBreakpoint = () => {
  if (typeof window === "undefined") return;

  const width = window.innerWidth;
  if (width < 768) {
    currentBreakpoint.value = "mobile";
    sidebarOpen.value = false; // Auto close on mobile
  } else if (width < 1024) {
    currentBreakpoint.value = "tablet";
    sidebarOpen.value = false; // Start closed on tablet
  } else {
    currentBreakpoint.value = "desktop";
    sidebarOpen.value = true; // Auto open on desktop
  }
};

// Initialize on client side only
export const initializeSidebar = () => {
  if (typeof window !== "undefined" && !isHydrated.value) {
    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    isHydrated.value = true;
  }
};

export const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
