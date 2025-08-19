/**
 * @fileoverview Auth0 authentication signals with JWT/JWE decoding
 */

import { signal, computed } from '@preact/signals';
import { getAccessToken } from './Auth0Provider';

export interface DecodedJWT {
  header: Record<string, any>;
  payload: Record<string, any>;
  signature: string;
}

export interface JWEDecoded {
  header: Record<string, any>;
  payload: Record<string, any>;
  encryptedKey?: string | undefined;
  iv?: string | undefined;
  ciphertext?: string | undefined;
  tag?: string | undefined;
}

export interface AuthTokenData {
  accessToken: string | null;
  idToken: string | null;
  decodedAccessToken: DecodedJWT | null;
  decodedIdToken: DecodedJWT | null;
  jweToken: string | null;
  decodedJWE: JWEDecoded | null;
  userInfo: Record<string, any> | null;
  loading: boolean;
  error: string | null;
}

export const authTokenSignal = signal<AuthTokenData>({
  accessToken: null,
  idToken: null,
  decodedAccessToken: null,
  decodedIdToken: null,
  jweToken: null,
  decodedJWE: null,
  userInfo: null,
  loading: false,
  error: null,
});

export const hasValidTokens = computed(
  () =>
    authTokenSignal.value.accessToken !== null &&
    authTokenSignal.value.idToken !== null
);

export const userProfile = computed(() => {
  const { decodedIdToken, userInfo } = authTokenSignal.value;
  // Prioritize userInfo from /userinfo endpoint, fallback to ID token
  return {
    ...(decodedIdToken?.payload || {}),
    ...(userInfo || decodedIdToken?.payload || {}),
  };
});

export const tokenClaims = computed(() => {
  const { decodedAccessToken, decodedIdToken } = authTokenSignal.value;
  return {
    accessTokenClaims: decodedAccessToken?.payload || {},
    idTokenClaims: decodedIdToken?.payload || {},
  };
});

/**
 * Decodes JWT token
 */
function decodeJWT(token: string): DecodedJWT {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }

    const header = JSON.parse(atob(parts[0] || ''));
    const payload = JSON.parse(atob(parts[1] || ''));
    const signature = parts[2] || '';

    return { header, payload, signature };
  } catch (error) {
    throw new Error(`Failed to decode JWT: ${error}`);
  }
}

/**
 * Decodes JWE token (simplified - basic structure parsing)
 */
function decodeJWE(token: string): JWEDecoded {
  try {
    const parts = token.split('.');
    if (parts.length < 4) {
      throw new Error('Invalid JWE format');
    }

    const header = JSON.parse(atob(parts[0] || ''));
    const encryptedKey = parts[1] || '';
    const iv = parts[2] || '';
    const ciphertext = parts[3] || '';
    const tag = parts[4] || '';

    return {
      header,
      payload: {}, // JWE payload is encrypted
      encryptedKey,
      iv,
      ciphertext,
      tag,
    };
  } catch (error) {
    throw new Error(`Failed to decode JWE: ${error}`);
  }
}

/**
 * Loads and decodes tokens from Auth0
 */
export async function loadAuthTokens(): Promise<void> {
  authTokenSignal.value = {
    ...authTokenSignal.value,
    loading: true,
    error: null,
  };

  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      authTokenSignal.value = {
        ...authTokenSignal.value,
        accessToken: null,
        idToken: null,
        decodedAccessToken: null,
        decodedIdToken: null,
        jweToken: null,
        decodedJWE: null,
        userInfo: null,
        loading: false,
      };
      return;
    }

    // Decode access token
    const decodedAccessToken = decodeJWT(accessToken);

    // Get ID token from localStorage (Auth0 stores it there)
    const idToken = localStorage.getItem('auth0.id_token');
    const decodedIdToken = idToken ? decodeJWT(idToken) : null;

    // Check for JWE token (if present)
    const jweToken = localStorage.getItem('auth0.jwe_token');
    const decodedJWE = jweToken ? decodeJWE(jweToken) : null;

    // Fetch user info from Auth0 userinfo endpoint
    const userInfo = await fetchUserInfo(accessToken);

    // Fallback to ID token payload if userInfo is null
    const finalUserInfo = userInfo || decodedIdToken?.payload || null;

    authTokenSignal.value = {
      accessToken,
      idToken,
      decodedAccessToken,
      decodedIdToken,
      jweToken,
      decodedJWE,
      userInfo: finalUserInfo,
      loading: false,
      error: null,
    };
  } catch (error) {
    authTokenSignal.value = {
      ...authTokenSignal.value,
      loading: false,
      error: error instanceof Error ? error.message : 'Failed to load tokens',
    };
  }
}

/**
 * Fetches user info from Auth0 userinfo endpoint
 */
async function fetchUserInfo(
  accessToken: string
): Promise<Record<string, any> | null> {
  try {
    const response = await fetch(
      `https://${import.meta.env.VITE_AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    return null;
  }
}

/**
 * Clears all tokens
 */
export function clearAuthTokens(): void {
  authTokenSignal.value = {
    accessToken: null,
    idToken: null,
    decodedAccessToken: null,
    decodedIdToken: null,
    jweToken: null,
    decodedJWE: null,
    userInfo: null,
    loading: false,
    error: null,
  };

  // Clear from localStorage
  localStorage.removeItem('auth0.id_token');
  localStorage.removeItem('auth0.jwe_token');
}

/**
 * Refreshes token data
 */
export async function refreshAuthTokens(): Promise<void> {
  await loadAuthTokens();
}

/**
 * Hook for using Auth0 authentication signals
 */
export function useAuthSignals() {
  return {
    user: userProfile,
    isAuthenticated: hasValidTokens,
    login: () => {
      // Redirect to Auth0 login
      window.location.href = '/api/auth/login';
    },
    logout: () => {
      // Redirect to Auth0 logout
      window.location.href = '/api/auth/logout';
    },
    getUserProfile: loadAuthTokens,
  };
}
