import {
  sidebarOpen,
  currentBreakpoint,
  toggleSidebar,
  isHydrated,
  currentPath,
  updateCurrentPath,
} from './SidebarState';
import { t } from '@services/i18n';
import { AuthButton } from './AuthProvider';

export function Sidebar() {
  const isActiveRoute = (path: string) => {
    return currentPath.value === path;
  };

  // Helper to check if sidebar is collapsed
  const isCollapsed = () => {
    return (
      isHydrated.value &&
      (currentBreakpoint.value === 'tablet' ||
        currentBreakpoint.value === 'desktop') &&
      !sidebarOpen.value
    );
  };

  // Dynamic classes for icons based on sidebar state
  const getIconClasses = () => {
    if (typeof window === 'undefined' || !isHydrated.value) {
      return 'w-6 h-6 mr-3';
    }

    return isCollapsed() ? 'w-8 h-8' : 'w-6 h-6 mr-3';
  };

  // Dynamic classes for nav links based on sidebar state
  const getNavLinkClasses = (path: string) => {
    const baseClasses =
      'flex items-center rounded-md transition-all duration-300';
    const activeClasses = 'bg-bg-accent-soft text-text-accent';
    const inactiveClasses = 'hover:bg-bg-surface text-text-muted';

    const stateClasses = isActiveRoute(path) ? activeClasses : inactiveClasses;

    return isCollapsed()
      ? `${baseClasses} ${stateClasses} justify-center px-1 py-2`
      : `${baseClasses} ${stateClasses} px-3 py-2`;
  };

  const handleNavigation = (e: Event, href: string) => {
    e.preventDefault();
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
    // Update current path signal immediately
    updateCurrentPath();
    // Close sidebar on mobile after navigation
    if (currentBreakpoint.value === 'mobile') {
      sidebarOpen.value = false;
    }
  };

  const getSidebarClasses = () => {
    const baseClasses =
      'fixed top-0 left-0 h-screen bg-bg-surface shadow-lg border-r border-border-primary z-50 transition-all duration-300 ease-in-out';

    // SSR - always render as desktop with sidebar open for consistency
    if (typeof window === 'undefined') {
      return `${baseClasses} w-64 transform translate-x-0`;
    }

    // Client side - immediate post-hydration should match SSR
    if (!isHydrated.value) {
      return `${baseClasses} w-64 transform translate-x-0`;
    }

    // Fully hydrated - use responsive behavior
    if (currentBreakpoint.value === 'mobile') {
      return `${baseClasses} w-64 transform ${
        sidebarOpen.value ? 'translate-x-0' : '-translate-x-full'
      }`;
    } else {
      // Tablet and Desktop - allow collapsing
      return `${baseClasses} ${
        sidebarOpen.value ? 'w-64' : 'w-16'
      } transform translate-x-0`;
    }
  };

  return (
    <>
      {/* Overlay for mobile - only render after hydration to avoid SSR mismatch */}
      {typeof window !== 'undefined' &&
        isHydrated.value &&
        currentBreakpoint.value === 'mobile' &&
        sidebarOpen.value && (
          <button
            type="button"
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden cursor-pointer border-0 p-0"
            onClick={toggleSidebar}
            onKeyDown={(e) => e.key === 'Escape' && toggleSidebar()}
            aria-label="Close sidebar"
          />
        )}

      {/* Sidebar */}
      <aside className={getSidebarClasses()}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center px-4 py-3 border-b border-border-primary">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-bg-primary flex-shrink-0"
              aria-label={t('toggleSidebar')}
            >
              {/* Icon changes based on sidebar state */}
              {sidebarOpen.value ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            <a
              href="/"
              onClick={(e) => handleNavigation(e, '/')}
              className={getNavLinkClasses('/')}
            >
              <svg
                className={getIconClasses()}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              <span
                className={`nav-text transition-all duration-300 ease-in-out ${
                  isCollapsed() ? 'opacity-0 w-0' : 'opacity-100 w-auto'
                }`}
              >
                {t('homePage')}
              </span>
            </a>
            <a
              href="/about"
              onClick={(e) => handleNavigation(e, '/about')}
              className={getNavLinkClasses('/about')}
            >
              <svg
                className={getIconClasses()}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span
                className={`nav-text transition-all duration-300 ease-in-out ${
                  isCollapsed() ? 'opacity-0 w-0' : 'opacity-100 w-auto'
                }`}
              >
                {t('aboutPage')}
              </span>
            </a>
            <a
              href="/settings"
              onClick={(e) => handleNavigation(e, '/settings')}
              className={getNavLinkClasses('/settings')}
            >
              <svg
                className={getIconClasses()}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span
                className={`nav-text transition-all duration-300 ease-in-out ${
                  isCollapsed() ? 'opacity-0 w-0' : 'opacity-100 w-auto'
                }`}
              >
                {t('settingsPage')}
              </span>
            </a>
            <a
              href="/profile"
              onClick={(e) => handleNavigation(e, '/profile')}
              className={getNavLinkClasses('/profile')}
            >
              <svg
                className={getIconClasses()}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span
                className={`nav-text transition-all duration-300 ease-in-out ${
                  isCollapsed() ? 'opacity-0 w-0' : 'opacity-100 w-auto'
                }`}
              >
                {t('profilePage')}
              </span>
            </a>
            <a
              href="/demo"
              onClick={(e) => handleNavigation(e, '/demo')}
              className={getNavLinkClasses('/demo')}
            >
              <svg
                className={getIconClasses()}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
              </svg>
              <span
                className={`nav-text transition-all duration-300 ease-in-out ${
                  isCollapsed() ? 'opacity-0 w-0' : 'opacity-100 w-auto'
                }`}
              >
                {t('demoPage')}
              </span>
            </a>
            <a
              href="/translations"
              onClick={(e) => handleNavigation(e, '/translations')}
              className={getNavLinkClasses('/translations')}
            >
              <svg
                className={getIconClasses()}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span
                className={`nav-text transition-all duration-300 ease-in-out ${
                  isCollapsed() ? 'opacity-0 w-0' : 'opacity-100 w-auto'
                }`}
              >
                {t('translationBrowserPage')}
              </span>
            </a>
          </nav>

          {/* Auth Section */}
          <div className="px-4 py-4 border-t border-border-primary">
            <AuthButton isCollapsed={isCollapsed()} />
          </div>
        </div>
      </aside>
    </>
  );
}
