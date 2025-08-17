/**
 * @fileoverview Auth0 authentication service for Preact application
 */

import { createAuth0Client, Auth0Client } from "@auth0/auth0-spa-js";
import { signal, computed } from "@preact/signals";

// Get configuration from environment variables
const AUTH0_DOMAIN =
  import.meta.env.VITE_AUTH0_DOMAIN || "dev-4xxb1z18b3z4hc6s.us.auth0.com";
const AUTH0_CLIENT_ID =
  import.meta.env.VITE_AUTH0_CLIENT_ID || "MjnBOrUzjRZdOUoEvMfChtQhoeZ5VNvi";
const AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE || "";
const AUTH0_SCOPE = import.meta.env.VITE_AUTH0_SCOPE || "openid profile email";

export interface Auth0User {
  email?: string;
  name?: string;
  picture?: string;
  sub?: string;
  [key: string]: any;
}

export interface Auth0State {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: Auth0User | null;
  error: string | null;
}

let auth0Client: Auth0Client | null = null;

export const auth0State = signal<Auth0State>({
  isLoading: true,
  isAuthenticated: false,
  user: null,
  error: null,
});

export const isAuthenticated = computed(() => auth0State.value.isAuthenticated);
export const user = computed(() => auth0State.value.user);
export const isLoading = computed(() => auth0State.value.isLoading);

export async function initializeAuth0(): Promise<void> {
  try {
    console.log("Auth0 Config:", {
      domain: AUTH0_DOMAIN,
      clientId: AUTH0_CLIENT_ID,
      audience: AUTH0_AUDIENCE,
    });

    auth0Client = await createAuth0Client({
      domain: AUTH0_DOMAIN,
      clientId: AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin,
        scope: AUTH0_SCOPE,
        ...(AUTH0_AUDIENCE?.trim() && { audience: AUTH0_AUDIENCE }),
      },
      cacheLocation: "localstorage",
      useRefreshTokens: true,
    });

    await checkAuthState();

    if (
      window.location.search.includes("code=") ||
      window.location.search.includes("error=")
    ) {
      await handleRedirectCallback();
    }
  } catch (error) {
    console.error("Auth0 init failed:", error);
    auth0State.value = {
      ...auth0State.value,
      isLoading: false,
      error:
        error instanceof Error ? error.message : "Failed to initialize Auth0",
    };
  }
}

export async function checkAuthState(): Promise<void> {
  if (!auth0Client) return;

  try {
    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
      const user = await auth0Client.getUser();
      auth0State.value = {
        isLoading: false,
        isAuthenticated: true,
        user: user || null,
        error: null,
      };
    } else {
      auth0State.value = {
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    }
  } catch (error) {
    console.error("Auth state check failed:", error);
    auth0State.value = {
      isLoading: false,
      isAuthenticated: false,
      user: null,
      error:
        error instanceof Error ? error.message : "Authentication check failed",
    };
  }
}

export async function handleRedirectCallback(): Promise<void> {
  if (!auth0Client) return;

  try {
    const result = await auth0Client.handleRedirectCallback();
    await checkAuthState();
    const targetUrl = result.appState?.targetUrl || "/";
    window.history.replaceState({}, document.title, targetUrl);
  } catch (error) {
    console.error("Redirect callback failed:", error);
    auth0State.value = {
      ...auth0State.value,
      isLoading: false,
      error: error instanceof Error ? error.message : "Login callback failed",
    };
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

export async function loginWithRedirect(options?: {
  targetUrl?: string;
}): Promise<void> {
  if (!auth0Client) throw new Error("Auth0 not initialized");

  try {
    await auth0Client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
      appState: {
        targetUrl: options?.targetUrl || window.location.pathname,
      },
    });
  } catch (error) {
    console.error("Login failed:", error);
    auth0State.value = {
      ...auth0State.value,
      error: error instanceof Error ? error.message : "Login failed",
    };
  }
}

export async function loginWithPopup(): Promise<void> {
  if (!auth0Client) throw new Error("Auth0 not initialized");

  try {
    auth0State.value = { ...auth0State.value, isLoading: true };

    await auth0Client.loginWithPopup({
      authorizationParams: {
        scope: AUTH0_SCOPE,
        ...(AUTH0_AUDIENCE?.trim() && { audience: AUTH0_AUDIENCE }),
      },
    });

    await checkAuthState();
  } catch (error) {
    console.error("Popup login failed:", error);
    auth0State.value = {
      ...auth0State.value,
      isLoading: false,
      error: error instanceof Error ? error.message : "Popup login failed",
    };
  }
}

export async function logout(returnTo?: string): Promise<void> {
  if (!auth0Client) return;

  await auth0Client.logout({
    logoutParams: {
      returnTo: returnTo || window.location.origin,
    },
  });
}

export async function getAccessToken(): Promise<string | null> {
  if (!auth0Client) return null;

  try {
    return await auth0Client.getTokenSilently();
  } catch (error) {
    console.error("Token retrieval failed:", error);
    return null;
  }
}

export function clearError(): void {
  auth0State.value = {
    ...auth0State.value,
    error: null,
  };
}
