// Main components barrel export
export * from "./form";
export * from "./layout";
export * from "./navigation";
export * from "./feedback";
export * from "./display";
export * from "./form-advanced";
export * from "./utility";

// Existing components (keep until migration is complete)
export { AppTitle } from "./AppTitle";
export { count, appName } from "./Counter";
export { CounterButton } from "./CounterButton";
export { ApiTester } from "./ApiTester";
export { Auth0Button } from "./Auth0Button";
export { AuthProvider } from "./AuthProvider";
export { Sidebar } from "./Sidebar";
export {
  sidebarOpen,
  currentBreakpoint,
  isHydrated,
  currentPath,
  initializeSidebar,
} from "./SidebarState";
