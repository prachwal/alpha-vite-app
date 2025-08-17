import "./index.css";
import { hydrate } from "preact";
import { LocationProvider } from "preact-iso";
import { App } from "./app";
import { initializeTheme } from "./services/ThemeProvider";
import { initializeSidebar } from "./components/SidebarState";
import { initializeI18n } from "./services/i18n";

// Initialize services on client side
async function initializeServices() {
  console.log("[Client] Initializing services...");

  // Initialize i18n first
  await initializeI18n();

  // Then initialize theme and sidebar
  initializeTheme();
  initializeSidebar();

  console.log("[Client] All services initialized");
}

// Initialize and hydrate
initializeServices().then(() => {
  hydrate(
    <LocationProvider>
      <App />
    </LocationProvider>,
    document.getElementById("app") as HTMLElement
  );
});
