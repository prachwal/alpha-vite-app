/**
 * @fileoverview Auth0 authentication button component
 * Provides login/logout functionality using Auth0
 */

import { useEffect, useState } from 'preact/hooks';
import {
  auth0State,
  loginWithRedirect,
  loginWithPopup,
  logout,
  clearError,
} from '@services/Auth0Provider';
import { usePageTranslations } from '@services/i18n';

interface Auth0ButtonProps {
  /** Use popup instead of redirect for login */
  readonly usePopup?: boolean;
  /** Show user info when authenticated */
  readonly showUserInfo?: boolean;
  /** Custom CSS classes */
  readonly className?: string;
}

/**
 * Auth0 authentication button component
 */
export function Auth0Button({
  usePopup = false,
  showUserInfo = true,
  className = '',
}: Auth0ButtonProps) {
  const t = usePageTranslations('settings');
  const [localLoading, setLocalLoading] = useState(false);

  // Subscribe to auth state changes
  const { isLoading, isAuthenticated, user, error } = auth0State.value;

  useEffect(() => {
    if (error) {
      console.error('Auth0 error:', error);
      // Auto-clear error after 5 seconds
      const timeout = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  const handleLogin = async () => {
    try {
      setLocalLoading(true);
      if (usePopup) {
        await loginWithPopup();
      } else {
        await loginWithRedirect();
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLocalLoading(true);
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLocalLoading(false);
    }
  };

  const loading = isLoading || localLoading;

  // Show error state
  if (error) {
    return (
      <div className={`text-sm ${className}`}>
        <div className="text-red-500 mb-2">
          {t('authError') || 'Błąd uwierzytelniania'}: {error}
        </div>
        <button
          onClick={() => clearError()}
          className="text-xs text-blue-500 hover:text-blue-400"
        >
          {t('dismiss') || 'Zamknij'}
        </button>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className={`text-sm text-text-muted ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <span>{t('loading') || 'Ładowanie...'}</span>
        </div>
      </div>
    );
  }

  // Show authenticated state
  if (isAuthenticated && user) {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {showUserInfo && (
          <div className="flex items-center space-x-2">
            {user.picture && (
              <img
                src={user.picture}
                alt={user.name || user.email || 'User'}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <div className="text-sm">
              <div className="text-text-primary font-medium">
                {user.name || user.email}
              </div>
              {user.name && user.email && (
                <div className="text-text-muted text-xs">{user.email}</div>
              )}
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:text-red-400 transition-colors"
        >
          {t('logout') || 'Wyloguj'}
        </button>
      </div>
    );
  }

  // Show login button
  return (
    <button
      onClick={handleLogin}
      className={`text-sm text-blue-500 hover:text-blue-400 transition-colors ${className}`}
    >
      {t('loginAuth0') || 'Zaloguj przez Auth0'}
    </button>
  );
}

/**
 * Simple Auth0 login status indicator
 */
export function Auth0Status() {
  const t = usePageTranslations('settings');
  const { isAuthenticated, user, isLoading } = auth0State.value;

  if (isLoading) {
    return (
      <div className="text-xs text-text-muted">
        {t('checkingAuth') || 'Sprawdzanie uwierzytelniania...'}
      </div>
    );
  }

  return (
    <div className="text-xs text-text-muted">
      Status:{' '}
      {isAuthenticated
        ? `${t('authenticated') || 'Uwierzytelniony'} (${
            user?.email || user?.name || 'Użytkownik'
          })`
        : t('notAuthenticated') || 'Nieuwierzytelniony'}
    </div>
  );
}
