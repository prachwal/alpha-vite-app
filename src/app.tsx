import './app.css';
import { Router, Route } from 'preact-iso';
import { Sidebar } from './components/Sidebar';
import {
  sidebarOpen,
  currentBreakpoint,
  isHydrated,
} from './components/SidebarState';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SettingsPage } from './pages/SettingsPage';
import { PageDemo } from './pages/PageDemo';
import { toggleDarkMode, themeConfig } from '@services/ThemeProvider';
import { t } from '@services/i18n';
import { useEffect, useState } from 'preact/hooks';

export function App() {
  // Dodaj stan do śledzenia czy jesteśmy po stronie klienta
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    // To zapewni, że logika klienta uruchomi się dopiero po hydratacji
    setIsClientSide(true);
  }, []);

  const getMainContentMargin = () => {
    // Podczas SSR i pierwszego renderowania po hydratacji - zawsze używaj desktop layout
    if (typeof window === 'undefined' || !isClientSide || !isHydrated.value) {
      return 'lg:ml-64';
    }

    // Dopiero po pełnej hydratacji używaj responsywnego zachowania
    if (currentBreakpoint.value === 'mobile') {
      return 'lg:ml-0';
    }
    if (currentBreakpoint.value === 'tablet') {
      return sidebarOpen.value ? 'ml-64' : 'ml-16';
    }
    // Desktop - obsługa zwijania
    if (currentBreakpoint.value === 'desktop') {
      return sidebarOpen.value ? 'ml-64' : 'ml-16';
    }
    return 'lg:ml-64';
  };

  const handleThemeToggle = () => {
    console.log(
      '[App] Theme toggle clicked, current mode:',
      themeConfig.value.mode
    );
    toggleDarkMode();
  };

  const toggleMobileSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  };

  return (
    <div className="h-full bg-bg-primary text-text-primary flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className={`
          flex-1 flex flex-col transition-all duration-300 ease-in-out
          ${getMainContentMargin()}
        `}
      >
        {/* Header */}
        <header className="bg-bg-surface shadow-sm border-b border-border-primary px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Mobile hamburger menu */}
            <button
              onClick={toggleMobileSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={t('toggleSidebar')}
            >
              <svg
                className="w-6 h-6 text-text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            {/* Centered title for mobile, left-aligned for desktop */}
            <h1 className="text-2xl font-semibold text-text-primary flex-1 text-center lg:text-left">
              {import.meta.env.VITE_APP_NAME || t('appName')}
            </h1>

            {/* Theme toggle button */}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-lg hover:bg-bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={t('toggleTheme')}
            >
              {/* Sun icon for light mode, Moon icon for dark mode */}
              {themeConfig.value.mode === 'light' ? (
                // Sun icon
                <svg
                  className="w-5 h-5 text-text-muted transition-colors"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                // Moon icon
                <svg
                  className="w-5 h-5 text-text-muted transition-colors"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8">
            <Router>
              <Route path="/" component={HomePage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/settings" component={SettingsPage} />
              <Route path="/demo" component={PageDemo} />
            </Router>
          </div>
        </div>
      </main>
    </div>
  );
}
