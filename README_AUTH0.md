# Auth0 Integration Documentation

## Status integracji ✅
**Aplikacja Alpha Vite App została pomyślnie zintegrowana z Auth0!**

## Konfiguracja Auth0

### Dane aplikacji Auth0
- **Domain**: `dev-4xxb1z18b3z4hc6s.us.auth0.com`
- **Client ID**: `MjnBOrUzjRZdOUoEvMfChtQhoeZ5VNvi`
- **Application Type**: Single Page Application (SPA)

### Callback URLs
- **Development**: `http://localhost:5173`
- **Production**: `https://alpha-vite-app.vercel.app`

## Zmienne środowiskowe

### Plik .env (development)
```bash
VITE_AUTH0_DOMAIN=dev-4xxb1z18b3z4hc6s.us.auth0.com
VITE_AUTH0_CLIENT_ID=MjnBOrUzjRZdOUoEvMfChtQhoeZ5VNvi
VITE_APP_NAME=Alpha Vite App
```

### Vercel Environment Variables
```bash
VITE_AUTH0_DOMAIN=dev-4xxb1z18b3z4hc6s.us.auth0.com
VITE_AUTH0_CLIENT_ID=MjnBOrUzjRZdOUoEvMfChtQhoeZ5VNvi
```

## Struktura plików

### `/src/services/Auth0Provider.ts`
Główny serwis Auth0 zawierający:
- Konfigurację klienta Auth0
- Zarządzanie stanem uwierzytelniania (signals)
- Funkcje logowania/wylogowywania
- Obsługę callback'ów

### `/src/components/AuthProvider.tsx`
Komponent React/Preact zawierający:
- Hook `useAuth()` do zarządzania stanem auth
- Komponent `AuthButton` dla sidebar
- Funkcję `AuthProvider()` dla kompatybilności wstecznej

## Używanie w kodzie

### Hook useAuth
```tsx
import { useAuth } from '../components/AuthProvider';

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
        <button onClick={handleLogin}>Zaloguj</button>
      )}
    </div>
  );
}
```

## Rozwiązane problemy

### ❌ "Service not found: https://alpha-vite-api"
**Problem**: Błędna konfiguracja `audience`
**✅ Rozwiązano**: Usunięto zmienną `VITE_AUTH0_AUDIENCE` - nie jest potrzebna dla prostej aplikacji SPA

### ❌ Uszkodzony plik AuthProvider.tsx
**Problem**: Plik zawierał błędne importy i był pusty
**✅ Rozwiązano**: Odtworzono plik z poprawnymi importami z `Auth0Provider.ts`

### ❌ Duplikowane deklaracje w Auth0Provider.ts
**Problem**: Plik zawierał duplikaty zmiennych i funkcji
**✅ Rozwiązano**: Odtworzono plik od nowa z czystym kodem

## Testowanie

### Development
```bash
npm run dev
# Otwórz http://localhost:5173
# Kliknij "Zaloguj się" w sidebar
```

### Production
Aplikacja dostępna pod adresem:
https://alpha-vite-app.vercel.app

## Funkcjonalności

### ✅ Zaimplementowane i działające
- [x] Logowanie przez redirect
- [x] Wylogowywanie
- [x] Zarządzanie stanem (Preact Signals)
- [x] Obsługa callback'ów po logowaniu
- [x] Obsługa błędów
- [x] Cache w localStorage
- [x] Refresh tokens
- [x] Responsive UI w sidebar
- [x] Internacjonalizacja (i18n)
- [x] TypeScript support
- [x] Integracja z Vercel

## Komendy Auth0 CLI użyte podczas konfiguracji

```bash
# Utworzenie aplikacji
auth0 apps create --name "Alpha Vite App" --type spa --callbacks "http://localhost:5173,https://alpha-vite-app.vercel.app"

# Aktualizacja callback URLs
auth0 apps update MjnBOrUzjRZdOUoEvMfChtQhoeZ5VNvi --callbacks "http://localhost:5173,https://alpha-vite-app.vercel.app"

# Dodanie zmiennych środowiskowych do Vercel
vercel env add VITE_AUTH0_DOMAIN
vercel env add VITE_AUTH0_CLIENT_ID
```
2. Przejdź do Applications > Applications
3. Kliknij "Create Application"
4. Nazwa: `Alpha Vite App`
5. Typ: `Single Page Application`
6. Kliknij "Create"

### 2. Konfiguracja ustawień aplikacji
W ustawieniach aplikacji ustaw:

**Allowed Callback URLs:**
```
https://alpha-vite-app.vercel.app/
http://localhost:5173/
```

**Allowed Logout URLs:**
```
https://alpha-vite-app.vercel.app/
http://localhost:5173/
```

**Allowed Web Origins:**
```
https://alpha-vite-hjcu7zf5u-prachwals-projects.vercel.app
http://localhost:5173
```

### 3. Konfiguracja pliku .env
Po utworzeniu aplikacji w Auth0, skopiuj:
- Domain
- Client ID

I zaktualizuj plik `.env`:
```
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
```

## Instalacja Auth0 CLI (opcjonalnie)

```bash
# macOS
brew tap auth0/auth0-cli && brew install auth0

# Windows
scoop bucket add auth0 https://github.com/auth0/scoop-auth0-cli.git
scoop install auth0

# Linux
curl -sSfL https://raw.githubusercontent.com/auth0/auth0-cli/main/install.sh | sh -s -- -b /usr/local/bin
```

## Konfiguracja za pomocą CLI

```bash
# Zaloguj się
auth0 login

# Utwórz aplikację
auth0 apps create \
  --name "Alpha Vite App" \
  --type spa \
  --callbacks "https://alpha-vite-app.vercel.app/,http://localhost:5173/" \
  --logout-urls "https://alpha-vite-app.vercel.app/,http://localhost:5173/" \
  --web-origins "https://alpha-vite-hjcu7zf5u-prachwals-projects.vercel.app,http://localhost:5173"
```

## Testowanie

Po konfiguracji:
1. Uruchom aplikację: `npm run dev`
2. Otwórz http://localhost:5173
3. Kliknij "Zaloguj się" w sidebarze
4. Przetestuj proces logowania/logout

## Rozwiązywanie problemów

### Błąd: "Callback URL mismatch"
- Sprawdź dokładnie URL w ustawieniach Auth0
- Upewnij się, że brak ukośnika na końcu URL

### Błąd: "Invalid client ID"
- Sprawdź czy `VITE_AUTH0_CLIENT_ID` jest poprawnie ustawione w `.env`

### Błąd: "Domain not found"
- Sprawdź czy `VITE_AUTH0_DOMAIN` jest poprawnie ustawione