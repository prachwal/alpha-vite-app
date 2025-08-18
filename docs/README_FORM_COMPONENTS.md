# Professional Form Components Library

Kompleksowa biblioteka komponentów formularzy dla aplikacji Preact z TypeScript.

## 📦 Instalacja

```bash
npm install
```

## 🚀 Użycie

### Importowanie komponentów

```typescript
import { 
  Button, 
  Input, 
  TextArea, 
  Checkbox, 
  RadioGroup, 
  Form, 
  FormField,
  FormValidator 
} from '@/components/form';
```

## 📋 Komponenty

### Button
Przycisk z wieloma wariantami, rozmiarami i stanami.

```typescript
<Button 
  variant="primary" 
  size="md" 
  onClick={handleClick}
  loading={isLoading}
>
  Kliknij mnie
</Button>
```

**Właściwości:**
- `variant`: 'primary' | 'secondary' | 'danger' | 'ghost' | 'tertiary'
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `loading`: boolean
- `disabled`: boolean
- `fullWidth`: boolean

### Input
Pole tekstowe z walidacją i obsługą błędów.

```typescript
<Input
  type="email"
  placeholder="Wprowadź email"
  value={email}
  onChange={setEmail}
  error={errors.email}
  required
/>
```

**Właściwości:**
- `type`: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
- `size`: 'sm' | 'md' | 'lg'
- `variant`: 'outline' | 'filled' | 'flushed'
- `error`: string
- `required`: boolean

### TextArea
Pole tekstowe z automatycznym dopasowaniem wysokości.

```typescript
<TextArea
  placeholder="Wprowadź opis"
  value={description}
  onChange={setDescription}
  autoResize
  maxLength={500}
  showCharacterCount
/>
```

### Checkbox
Checkbox z obsługą stanu nieokreślonego.

```typescript
<Checkbox
  checked={isChecked}
  onChange={setIsChecked}
  indeterminate={isIndeterminate}
  disabled={isDisabled}
>
  Zgadzam się z regulaminem
</Checkbox>
```

### RadioGroup
Grupa przycisków radio.

```typescript
<RadioGroup
  name="gender"
  value={gender}
  onChange={setGender}
  options={[
    { value: 'male', label: 'Mężczyzna' },
    { value: 'female', label: 'Kobieta' },
    { value: 'other', label: 'Inne' }
  ]}
/>
```

### Form i FormField
Komponenty do budowy formularzy z walidacją.

```typescript
<Form onSubmit={handleSubmit}>
  <FormField label="Email" required error={errors.email}>
    <Input
      type="email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    />
  </FormField>
  
  <FormField label="Hasło" required error={errors.password}>
    <Input
      type="password"
      value={formData.password}
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    />
  </FormField>
  
  <Button type="submit" variant="primary" loading={isSubmitting}>
    Zaloguj się
  </Button>
</Form>
```

## 🔍 Walidacja

### FormValidator
Klasa do walidacji formularzy z gotowymi regułami.

```typescript
const validator = new FormValidator();

validator.addField('email', {
  required: true,
  custom: validator.validateEmail
});

validator.addField('password', {
  required: true,
  minLength: 8,
  custom: validator.validatePassword
});

const result = validator.validate(formData);
```

### Gotowe reguły walidacji

```typescript
import { validationRules } from '@/components/form';

// Email
validator.addField('email', validationRules.email);

// Telefon
validator.addField('phone', validationRules.phone);

// Hasło
validator.addField('password', validationRules.password);

// Kod pocztowy
validator.addField('postalCode', validationRules.postalCode);

// PESEL
validator.addField('pesel', validationRules.pesel);

// NIP
validator.addField('nip', validationRules.nip);
```

## 🎨 Stylowanie

Komponenty używają CSS variables dla spójnego stylowania:

```css
:root {
  /* Kolory */
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-danger: #dc3545;
  --color-warning: #ffc107;
  --color-info: #17a2b8;
  
  /* Rozmiary */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Typography */
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
}
```

## 🧪 Testowanie

Każdy komponent zawiera testy jednostkowe:

```bash
# Uruchomienie testów
npm test

# Testy z coverage
npm run test:coverage
```

## 📚 Storybook

Dokumentacja komponentów w Storybook:

```bash
# Uruchomienie Storybook
npm run storybook
```

## 🎯 Przykład kompletnego formularza

```typescript
import { useState } from 'preact/hooks';
import { 
  Form, 
  FormField, 
  Input, 
  Button, 
  FormValidator,
  validationRules 
} from '@/components/form';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    postalCode: '',
    terms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validator = new FormValidator();
  validator.addField('email', validationRules.email);
  validator.addField('password', validationRules.password);
  validator.addField('phone', validationRules.phone);
  validator.addField('postalCode', validationRules.postalCode);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    
    const result = validator.validate(formData);
    
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Hasła nie są identyczne' });
      return;
    }

    if (!formData.terms) {
      setErrors({ terms: 'Musisz zaakceptować regulamin' });
      return;
    }

    setIsSubmitting(true);
    // Przetwarzanie formularza...
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField label="Email" required error={errors.email}>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </FormField>

      <FormField label="Hasło" required error={errors.password}>
        <Input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </FormField>

      <FormField label="Powtórz hasło" required error={errors.confirmPassword}>
        <Input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        />
      </FormField>

      <FormField label="Imię" required>
        <Input
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />
      </FormField>

      <FormField label="Nazwisko" required>
        <Input
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
      </FormField>

      <FormField label="Telefon" required error={errors.phone}>
        <Input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </FormField>

      <FormField label="Kod pocztowy" required error={errors.postalCode}>
        <Input
          value={formData.postalCode}
          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
          placeholder="00-000"
        />
      </FormField>

      <FormField error={errors.terms}>
        <Checkbox
          checked={formData.terms}
          onChange={(checked) => setFormData({ ...formData, terms: checked })}
        >
          Akceptuję regulamin serwisu
        </Checkbox>
      </FormField>

      <Button 
        type="submit" 
        variant="primary" 
        loading={isSubmitting}
        fullWidth
      >
        Zarejestruj się
      </Button>
    </Form>
  );
};

export default RegistrationForm;
```

## 🔄 Aktualizacja

Aby zaktualizować komponenty, wystarczy zmienić wartości w plikach źródłowych. Wszystkie komponenty są w pełni responsywne i dostępne.

## 📄 Licencja

MIT License - możesz używać tych komponentów w swoich projektach komercyjnych i osobistych.