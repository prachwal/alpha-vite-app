# System Tłumaczeń (i18n)

## 📁 Struktura plików

```
src/locales/
├── en/                    # Angielski
│   ├── common.json       # Wspólne tłumaczenia
│   ├── home.json         # Strona główna
│   ├── profile.json      # Strona profilu
│   ├── settings.json     # Ustawienia
│   └── about.json        # O aplikacji
└── pl/                    # Polski
    ├── common.json       # Wspólne tłumaczenia
    ├── home.json         # Strona główna
    ├── profile.json      # Strona profilu
    ├── settings.json     # Ustawienia
    └── about.json        # O aplikacji
```

## 🚀 Szybki start

### Dodawanie nowych tłumaczeń

1. **Dodaj klucz do odpowiedniego pliku JSON**
   ```json
   // src/locales/en/common.json
   {
     "newKey": "New translation"
   }
   ```

2. **Dodaj tłumaczenie w drugim języku**
   ```json
   // src/locales/pl/common.json
   {
     "newKey": "Nowe tłumaczenie"
   }
   ```

3. **Użyj w komponencie**
   ```typescript
   import { usePageTranslations } from '@services/i18n';
   
   function MyComponent() {
     const t = usePageTranslations('common');
     return <div>{t('newKey')}</div>;
   }
   ```

### Debugowanie brakujących tłumaczeń

Sprawdź konsolę przeglądarki - i18next wyświetla ostrzeżenia o brakujących kluczach:
```
i18next::translator: missingKey en translation profilePage profilePage
```

### Organizacja kluczy

- **common.json**: Wspólne elementy UI (przyciski, komunikaty)
- **home.json**: Tłumaczenia strony głównej
- **profile.json**: Tłumaczenia strony profilu
- **settings.json**: Tłumaczenia ustawień
- **about.json**: Tłumaczenia strony "O aplikacji"

### Przykład użycia

```typescript
// Hook dla stron
const t = usePageTranslations('profile');

// Użycie w JSX
<h1>{t('title')}</h1>
<p>{t('description')}</p>

// Z interpolacją
<p>{t('welcome', { name: user.name })}</p>
```

### Konfiguracja języka

System automatycznie wykrywa preferowany język przeglądarki i używa go jako domyślny. Użytkownik może zmienić język w ustawieniach aplikacji.

### Rozszerzanie o nowe języki

1. Utwórz nowy katalog dla języka
2. Skopiuj strukturę plików z `en/` lub `pl/`
3. Przetłumacz wartości
4. Dodaj język do konfiguracji w `src/services/i18n.ts`