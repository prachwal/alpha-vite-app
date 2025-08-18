/**
 * @fileoverview Auth provider component with backward compatibility
 * Provides Auth0 authentication functionality using the new Auth0Provider service
 */

import { useEffect, useState } from "preact/hooks";
import {
  auth0State,
  loginWithRedirect,
  logout,
  clearError,
} from "@services/Auth0Provider";
import { usePageTranslations } from "@services/i18n";

interface User {
  name?: string;
  email?: string;
  picture?: string;
  sub?: string;
}

interface AuthButtonProps {
  readonly isCollapsed: boolean;
}

/**
 * Auth provider hook - main authentication logic
 */
export function useAuth() {
  const [localLoading, setLocalLoading] = useState(false);
  const { isLoading, isAuthenticated, user, error } = auth0State.value;

  useEffect(() => {
    if (error) {
      console.error("Auth error:", error);
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
      await loginWithRedirect();
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLocalLoading(true);
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  return {
    user: user as User | null,
    isAuthenticated,
    isLoading: isLoading || localLoading,
    error,
    handleLogin,
    handleLogout,
  };
}

/**
 * AuthButton component for use in sidebar
 */
export function AuthButton({ isCollapsed }: AuthButtonProps) {
  const t = usePageTranslations("settings");
  const { user, isLoading, isAuthenticated, handleLogin, handleLogout } =
    useAuth();

  if (isLoading) {
    return (
      <div
        className={`flex items-center ${isCollapsed ? "justify-center" : ""}`}
      >
        <div className="w-8 h-8 bg-bg-primary rounded-full animate-pulse"></div>
        {!isCollapsed && (
          <span className="ml-3 text-sm">{t("loading") || "Ładowanie..."}</span>
        )}
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div
        className={`flex items-center ${isCollapsed ? "justify-center" : ""}`}
      >
        {user.picture ? (
          <img
            src={user.picture}
            alt={user.name || user.email || "User"}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-bg-accent rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-text-accent">
              {(user.name || user.email || "U").charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        {!isCollapsed && (
          <div className="ml-3">
            <p className="text-sm font-medium text-text-primary">
              {user.name || user.email}
            </p>
            <button
              onClick={handleLogout}
              className="text-xs text-text-muted hover:text-text-primary transition-colors"
            >
              {t("logout") || "Wyloguj"}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className={`w-full flex items-center rounded-md transition-all duration-300 ${
        isCollapsed ? "justify-center px-1 py-2" : "px-3 py-2"
      } bg-bg-accent text-text-accent hover:bg-bg-accent-soft`}
    >
      <svg
        className={isCollapsed ? "w-8 h-8" : "w-6 h-6 mr-3"}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
        />
      </svg>
      {!isCollapsed && <span>{t("login") || "Zaloguj się"}</span>}
    </button>
  );
}

/**
 * AuthProvider function - for backward compatibility
 * @deprecated Use useAuth hook instead
 */
export function AuthProvider() {
  const auth = useAuth();

  return {
    ...auth,
    AuthButton: ({ isCollapsed }: { isCollapsed: boolean }) => (
      <AuthButton isCollapsed={isCollapsed} />
    ),
  };
}
