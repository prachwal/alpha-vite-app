# Auth0 Login Process & LocalStorage Data Flow Documentation

## 🔄 Kompletny proces logowania Auth0

### 1. Inicjalizacja Auth0 (`src/services/Auth0Provider.ts`)

#### Konfiguracja klienta Auth0
```typescript
// Konfiguracja Auth0 z localStorage jako cache
auth0Client = await createAuth0Client({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin,
    scope: AUTH0_SCOPE,
  },
  cacheLocation: 'localstorage', // 🔑 Kluczowe dla przechowywania
  useRefreshTokens: true,
});
```

#### Kluczowe zmienne środowiskowe
- `VITE_AUTH0_DOMAIN`: `dev-4xxb1z18b3z4hc6s.us.auth0.com`
- `VITE_AUTH0_CLIENT_ID`: `MjnBOrUzjRZdOUoEvMfChtQhoeZ5VNvi`
- `VITE_AUTH0_SCOPE`: `openid profile email`

### 2. Przepływ danych podczas logowania

#### Faza 1: Inicjalizacja aplikacji
```mermaid
graph TD
    A[Aplikacja startuje] --> B[initializeAuth0()]
    B --> C[createAuth0Client z localStorage cache]
    C --> D[checkAuthState()]
    D --> E{Użytkownik zalogowany?}
    E -->|Tak| F[Pobierz dane z localStorage]
    E -->|Nie| G[Pokaż przycisk "Zaloguj się"]
```

#### Faza 2: Proces logowania
```mermaid
graph TD
    A[Użytkownik klika "Zaloguj się"] --> B[loginWithRedirect()]
    B --> C[Przekierowanie do Auth0]
    C --> D[Użytkownik wprowadza dane]
    D --> E[Auth0 weryfikuje]
    E --> F[Przekierowanie z powrotem do aplikacji]
    F --> G[handleRedirectCallback()]
    G --> H[Zapis tokenów w localStorage]
    H --> I[Aktualizacja stanu aplikacji]
```

### 3. Struktura danych w localStorage

#### Auth0 automatycznie zapisuje:
```javascript
// Przykład danych w localStorage po zalogowaniu
{
  "auth0.is.authenticated": "true",
  "auth0_id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "auth0_jwe_token": "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMTI4R0NNIn0...",
  "auth0spajs": {
    "data": {
      "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "def50200...",
      "expires_in": 86400,
      "token_type": "Bearer"
    }
  }
}
```

#### Ręczne zapisywanie dodatkowych danych:
```typescript
// src/services/AuthSignals.ts - ręczne zapisywanie ID tokena
const idToken = localStorage.getItem('auth0_id_token');
const jweToken = localStorage.getItem('auth0_jwe_token');
```

### 4. Komponenty odpowiedzialne za logowanie

#### 🔧 `src/services/Auth0Provider.ts` (209 linii)
**Odpowiedzialność:** Główna konfiguracja Auth0
- Inicjalizacja klienta Auth0
- Obsługa redirect callback
- Zarządzanie stanem autoryzacji
- Funkcje logowania/wylogowywania

#### 🔧 `src/services/AuthSignals.ts` (252 linie)
**Odpowiedzialność:** Dekodowanie i przechowywanie tokenów
- Dekodowanie JWT tokenów
- Parsowanie JWE tokenów
- Pobieranie informacji o użytkowniku z `/userinfo`
- Zarządzanie tokenami w localStorage

#### 🔧 `src/components/AuthProvider.tsx` (171 linie)
**Odpowiedzialność:** Interfejs użytkownika
- Komponent `AuthButton` dla sidebar
- Hook `useAuth` do zarządzania stanem
- Obsługa błędów autoryzacji

### 5. Przykład użycia w komponencie

```typescript
// Użycie w komponencie
import { useAuth } from '@components/AuthProvider';

function MyComponent() {
  const { user, isAuthenticated, isLoading, handleLogin, handleLogout } = useAuth();
  
  if (isLoading) return <div>Ładowanie...</div>;
  
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Witaj, {user?.name}!</p>
          <button onClick={handleLogout}>Wyloguj</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Zaloguj się</button>
      )}
    </div>
  );
}
```

### 6. Bezpieczeństwo i zarządzanie tokenami

#### Automatyczne zarządzanie przez Auth0:
- ✅ Automatyczne odświeżanie tokenów
- ✅ Bezpieczne przechowywanie w localStorage
- ✅ Obsługa wygaśnięcia tokenów
- ✅ Czyszczenie przy wylogowaniu

#### Ręczne czyszczenie danych:
```typescript
// Czyszczenie wszystkich danych Auth0
export function clearAuthTokens(): void {
  // Czyszczenie customowych danych
  localStorage.removeItem('auth0_id_token');
  localStorage.removeItem('auth0_jwe_token');
  
  // Auth0 automatycznie czyści swoje dane przy logout()
}
```

### 7. Debugowanie i troubleshooting

#### Sprawdzenie danych w localStorage:
```javascript
// W konsoli przeglądarki
console.log('Auth0 data:', {
  isAuthenticated: localStorage.getItem('auth0.is.authenticated'),
  idToken: localStorage.getItem('auth0_id_token'),
  accessToken: JSON.parse(localStorage.getItem('auth0spajs') || '{}')
});
```

#### Testowanie logowania:
1. Uruchom aplikację: `npm run dev`
2. Otwórz http://localhost:5173
3. Kliknij "Zaloguj się" w sidebarze
4. Sprawdź localStorage w DevTools → Application → Local Storage

### 8. Integracja z Vercel

#### Zmienne środowiskowe w Vercel:
```bash
VITE_AUTH0_DOMAIN=dev-4xxb1z18b3z4hc6s.us.auth0.com
VITE_AUTH0_CLIENT_ID=MjnBOrUzjRZdOUoEvMfChtQhoeZ5VNvi
```

#### Callback URLs w Auth0 Dashboard:
- **Development**: `http://localhost:5173`
- **Production**: `https://alpha-vite-app.vercel.app`

### 9. Podsumowanie plików

| Plik | Linie | Odpowiedzialność |
|------|-------|------------------|
| `Auth0Provider.ts` | 209 | Konfiguracja Auth0, logowanie/wylogowanie |
| `AuthSignals.ts` | 252 | Dekodowanie tokenów, localStorage management |
| `AuthProvider.tsx` | 171 | UI komponenty, hook useAuth |

### 10. Następne kroki

1. ✅ **Zaimplementowane**: Podstawowe logowanie Auth0
2. ✅ **Zaimplementowane**: Przechowywanie w localStorage
3. ✅ **Zaimplementowane**: Dekodowanie tokenów JWT/JWE
4. 🔄 **W trakcie**: Integracja z komponentami UI
5. 📋 **Planowane**: Dodatkowe funkcje profilu użytkownika

**Status**: ✅ **Kompletna implementacja Auth0 z localStorage integration**