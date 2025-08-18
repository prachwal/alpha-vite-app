# Naprawa Testów - Lista kontrolna

## ⚠️ Status: W trakcie naprawy
- **Data ostatniej aktualizacji:** 2025-01-20
- **Stan ogólny:** 302 testy przechodzą ✅ | 52 testy nieudane ❌

## ✅ Zrobione
- [x] Dodano globalny mock `jest` jako `vi` w setup.ts dla kompatybilności
- [x] Naprawiono testy Alert komponentu (12/12 ✅)
- [x] Dodano brakujące pliki stories dla komponentów feedback
- [x] Utworzono Menu.stories.tsx

## 🔧 Problemy do naprawy

### 1. Problemy z jest mockami (52 testy)
**Status:** ⚠️ Częściowo naprawione (Alert ✅)
- **Problem:** Testy używają `jest.fn()` zamiast `vi.fn()`
- **Rozwiązanie:** Dodano globalny mock w setup.ts
- **Nieudane komponenty:**
  - Dialog: 8 testów ❌
  - Modal: 14 testów ❌  
  - Toast: 10 testów ❌
  - ToastContext: 7 testów ❌
  - Tooltip: 6 testów ❌
  - Loading: 1 test ❌

### 2. Problemy z komponentami (6 testów)
- **ToastContext testy:** Nie znajduje elementów Toast w DOM (5 testów)
- **Tooltip testy:** Nie znajduje tooltip w DOM po hover/focus (5 testów) 
- **Loading test:** Problem z importem convenience komponentów

## � Plan naprawy (priorytet)

### Wysokie (Critical)
1. **Napraw implementację Toast/ToastContext**
   - Problem: Testy nie znajdują renderowanych Toast elementów
   - Komponenty: ToastContext, ToastContainer

2. **Napraw implementację Tooltip**
   - Problem: Tooltip nie pokazuje się po hover/focus
   - Brakuje aria-describedby attribute

3. **Napraw eksport Loading komponentów**
   - Problem: LoadingSpinner, LoadingDots etc. nie są eksportowane

### Średnie (High)  
4. **Weryfikuj pozostałe komponenty feedback**
   - Modal: sprawdź implementację close handlers
   - Dialog: sprawdź implementację button callbacks

## 📊 Statystyki testów

### Komponenty ✅ (działają)
- Alert: 12/12 ✅
- Navigation: Tabs, Breadcrumb, Pagination ✅ 
- Layout: Container, Stack, Spacer ✅
- Core: Counter, ApiClient, ThemeProvider ✅

### Komponenty ❌ (wymagają naprawy)
- Dialog: 8/8 ❌ (jest mocks)
- Modal: 14/14 ❌ (jest mocks)
- Toast: 10/10 ❌ (jest mocks + DOM)
- ToastContext: 7/7 ❌ (jest mocks + DOM)
- Tooltip: 6/6 ❌ (jest mocks + DOM)
- Loading: 1/1 ❌ (import)

## 🎯 Następne kroki
1. Napraw implementację Toast komponentów (DOM rendering)
2. Napraw implementację Tooltip (hover/focus handlers)
3. Napraw eksporty Loading komponentów
4. Uruchom pełne testy i zweryfikuj wyniki

## 📈 Postęp
- **Przed:** 0 komponentów feedback działało
- **Teraz:** 1/6 komponentów feedback działa (Alert ✅)
- **Cel:** 6/6 komponentów feedback