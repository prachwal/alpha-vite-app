import { signal } from "@preact/signals";

// Initialize with SSR-safe defaults - sidebar always open on desktop during SSR
export const sidebarOpen = signal(true);
export const currentBreakpoint = signal<"mobile" | "tablet" | "desktop">(
  "desktop"
);
export const isHydrated = signal(false);

// Signal for tracking current path for reactive navigation
export const currentPath = signal(
  typeof window !== "undefined" ? window.location.pathname : "/"
);

// Update current path for reactive navigation
export const updateCurrentPath = () => {
  if (typeof window !== "undefined") {
    currentPath.value = window.location.pathname;
  }
};

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
    // Defer client-side state updates until after the initial render has been hydrated
    queueMicrotask(() => {
      isHydrated.value = true;
      updateBreakpoint();
      updateCurrentPath();
      window.addEventListener("resize", updateBreakpoint);
      window.addEventListener("popstate", updateCurrentPath);
    });
  }
};

export const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
