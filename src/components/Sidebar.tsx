import {
  sidebarOpen,
  currentBreakpoint,
  toggleSidebar,
  isHydrated,
} from "./SidebarState";
import { t } from "../services/i18n";

export function Sidebar() {
  const getCurrentPath = () => {
    if (typeof window !== "undefined") {
      return window.location.pathname;
    }
    return "/";
  };

  const isActiveRoute = (path: string) => {
    return getCurrentPath() === path;
  };

  const getNavItemClasses = (path: string) => {
    const baseClasses =
      "flex items-center px-3 py-2 rounded-md transition-colors";
    const activeClasses =
      "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300";
    const inactiveClasses =
      "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300";

    return `${baseClasses} ${
      isActiveRoute(path) ? activeClasses : inactiveClasses
    }`;
  };

  const handleNavigation = (e: Event, href: string) => {
    e.preventDefault();
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
    // Close sidebar on mobile after navigation
    if (currentBreakpoint.value === "mobile") {
      sidebarOpen.value = false;
    }
  };

  const getSidebarClasses = () => {
    // During SSR or before hydration, use safe defaults that match client initial state
    if (!isHydrated.value) {
      return "fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 z-50 transition-transform duration-300 ease-in-out transform -translate-x-full lg:translate-x-0";
    }

    const baseClasses =
      "fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 z-50 transition-transform duration-300 ease-in-out";

    if (currentBreakpoint.value === "mobile") {
      return `${baseClasses} w-64 transform ${
        sidebarOpen.value ? "translate-x-0" : "-translate-x-full"
      }`;
    } else if (currentBreakpoint.value === "tablet") {
      return `${baseClasses} ${
        sidebarOpen.value ? "w-64" : "w-16"
      } transform translate-x-0`;
    } else {
      return `${baseClasses} w-64 transform translate-x-0`;
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {currentBreakpoint.value === "mobile" && sidebarOpen.value && (
        <button
          type="button"
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden cursor-pointer border-0 p-0"
          onClick={toggleSidebar}
          onKeyDown={(e) => e.key === "Escape" && toggleSidebar()}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside className={getSidebarClasses()}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {(currentBreakpoint.value !== "tablet" || sidebarOpen.value) && (
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t("navigation")}
              </h2>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            <a
              href="/"
              className={getNavItemClasses("/")}
              onClick={(e) => handleNavigation(e, "/")}
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              {(currentBreakpoint.value !== "tablet" || sidebarOpen.value) && (
                <span>{t("home")}</span>
              )}
            </a>

            <a
              href="/about"
              className={getNavItemClasses("/about")}
              onClick={(e) => handleNavigation(e, "/about")}
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              {(currentBreakpoint.value !== "tablet" || sidebarOpen.value) && (
                <span>{t("about")}</span>
              )}
            </a>

            <a
              href="/settings"
              className={getNavItemClasses("/settings")}
              onClick={(e) => handleNavigation(e, "/settings")}
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              {(currentBreakpoint.value !== "tablet" || sidebarOpen.value) && (
                <span>{t("settings")}</span>
              )}
            </a>
          </nav>
        </div>
      </aside>
    </>
  );
}
