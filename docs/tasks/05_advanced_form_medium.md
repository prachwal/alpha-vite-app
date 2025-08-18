# 05_advanced_form_medium.md

## Zadanie: Implementacja zaawansowanych komponentów formularzy

### Priorytet: ŚREDNI ⭐

### Opis
Rozszerzenie systemu formularzy o zaawansowane komponenty - date pickers, file upload, rich text editor, color picker, slider i inne specialized inputs.

### Struktura folderów docelowa
```
src/components/
├── form-advanced/
│   ├── DatePicker/
│   │   ├── DatePicker.tsx
│   │   ├── DateRangePicker.tsx
│   │   ├── Calendar.tsx
│   │   ├── useDatePicker.ts
│   │   ├── DatePicker.test.tsx
│   │   ├── DatePicker.stories.tsx
│   │   └── index.ts
│   ├── FileUpload/
│   │   ├── FileUpload.tsx
│   │   ├── FileUploadArea.tsx
│   │   ├── FileList.tsx
│   │   ├── useFileUpload.ts
│   │   ├── FileUpload.test.tsx
│   │   ├── FileUpload.stories.tsx
│   │   └── index.ts
│   ├── RichTextEditor/
│   │   ├── RichTextEditor.tsx
│   │   ├── Toolbar.tsx
│   │   ├── useRichText.ts
│   │   ├── RichTextEditor.test.tsx
│   │   ├── RichTextEditor.stories.tsx
│   │   └── index.ts
│   ├── ColorPicker/
│   │   ├── ColorPicker.tsx
│   │   ├── ColorPalette.tsx
│   │   ├── ColorInput.tsx
│   │   ├── ColorPicker.test.tsx
│   │   ├── ColorPicker.stories.tsx
│   │   └── index.ts
│   ├── Slider/
│   │   ├── Slider.tsx
│   │   ├── RangeSlider.tsx
│   │   ├── Slider.test.tsx
│   │   ├── Slider.stories.tsx
│   │   └── index.ts
│   ├── Switch/
│   │   ├── Switch.tsx
│   │   ├── Switch.test.tsx
│   │   ├── Switch.stories.tsx
│   │   └── index.ts
│   ├── Rate/
│   │   ├── Rate.tsx
│   │   ├── Rate.test.tsx
│   │   ├── Rate.stories.tsx
│   │   └── index.ts
│   └── AutoComplete/
│       ├── AutoComplete.tsx
│       ├── useAutoComplete.ts
│       ├── AutoComplete.test.tsx
│       ├── AutoComplete.stories.tsx
│       └── index.ts
```

### Wymagania techniczne

#### 1. DatePicker Component
**Lokalizacja**: `src/components/form-advanced/DatePicker/`

**Interface**:
```tsx
interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | null) => void;
  format?: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  disabledDates?: (date: Date) => boolean;
  minDate?: Date;
  maxDate?: Date;
  showTime?: boolean;
  timeFormat?: string;
  locale?: string;
  clearable?: boolean;
  className?: string;
}

interface DateRangePickerProps {
  value?: readonly [Date | null, Date | null];
  onChange: (dates: readonly [Date | null, Date | null]) => void;
  format?: string;
  placeholder?: readonly [string, string];
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  disabledDates?: (date: Date) => boolean;
  minDate?: Date;
  maxDate?: Date;
  maxRange?: number;
  separator?: string;
  className?: string;
}
```

**Funkcjonalności**:
- Single date picker
- Date range picker
- Time selection
- Disabled dates logic
- Locale support
- Keyboard navigation
- Custom formatting
- Min/max constraints

#### 2. FileUpload Component
**Lokalizacja**: `src/components/form-advanced/FileUpload/`

**Interface**:
```tsx
interface FileUploadProps {
  value?: readonly File[];
  onChange: (files: readonly File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  onError?: (error: string) => void;
  dragAndDrop?: boolean;
  showPreview?: boolean;
  previewType?: 'list' | 'grid' | 'thumbnail';
  uploadText?: string;
  className?: string;
}

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}
```

**Funkcjonalności**:
- Drag & drop area
- Multiple file selection
- File size validation
- MIME type validation
- Upload progress
- Preview thumbnails
- File removal
- Error handling

#### 3. RichTextEditor Component
**Lokalizacja**: `src/components/form-advanced/RichTextEditor/`

**Interface**:
```tsx
interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  readonly?: boolean;
  toolbar?: readonly ToolbarItem[];
  height?: string | number;
  maxLength?: number;
  onImageUpload?: (file: File) => Promise<string>;
  mentions?: {
    trigger: string;
    data: readonly { id: string; display: string }[];
    onSelect: (item: any) => void;
  };
  className?: string;
}

interface ToolbarItem {
  type: 'button' | 'dropdown' | 'separator';
  action?: string;
  icon?: preact.ComponentType<any>;
  label?: string;
  options?: readonly { value: string; label: string }[];
}
```

**Funkcjonalności**:
- WYSIWYG editing
- Customizable toolbar
- Image upload support
- Mentions system
- Link insertion
- Text formatting
- List management
- HTML output

#### 4. ColorPicker Component
**Lokalizacja**: `src/components/form-advanced/ColorPicker/`

**Interface**:
```tsx
interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  format?: 'hex' | 'rgb' | 'hsl';
  presets?: readonly string[];
  showInput?: boolean;
  showAlpha?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Funkcjonalności**:
- Color wheel/palette
- Preset colors
- Alpha channel
- Format conversion
- Input field
- Color preview
- Recent colors

#### 5. Slider Component
**Lokalizacja**: `src/components/form-advanced/Slider/`

**Interface**:
```tsx
interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  marks?: Record<number, string>;
  vertical?: boolean;
  disabled?: boolean;
  tooltip?: boolean;
  tooltipFormatter?: (value: number) => string;
  included?: boolean;
  className?: string;
}

interface RangeSliderProps {
  value: readonly [number, number];
  onChange: (value: readonly [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  marks?: Record<number, string>;
  vertical?: boolean;
  disabled?: boolean;
  tooltip?: boolean;
  tooltipFormatter?: (value: number) => string;
  className?: string;
}
```

**Funkcjonalności**:
- Single value slider
- Range slider
- Vertical orientation
- Step values
- Marks/labels
- Tooltip display
- Keyboard control

#### 6. Switch Component
**Lokalizacja**: `src/components/form-advanced/Switch/`

**Interface**:
```tsx
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  checkedChildren?: preact.ComponentChildren;
  uncheckedChildren?: preact.ComponentChildren;
  className?: string;
}
```

**Funkcjonalności**:
- Toggle switch
- Loading state
- Text labels
- Size variants
- Smooth animations

#### 7. Rate Component
**Lokalizacja**: `src/components/form-advanced/Rate/`

**Interface**:
```tsx
interface RateProps {
  value: number;
  onChange: (value: number) => void;
  count?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  character?: preact.ComponentChildren;
  tooltips?: readonly string[];
  className?: string;
}
```

**Funkcjonalności**:
- Star rating
- Half ratings
- Custom icons
- Tooltips
- Clear option
- Hover effects

#### 8. AutoComplete Component
**Lokalizacja**: `src/components/form-advanced/AutoComplete/`

**Interface**:
```tsx
interface AutoCompleteOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface AutoCompleteProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly AutoCompleteOption[];
  onSearch?: (searchText: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  filterOption?: (inputValue: string, option: AutoCompleteOption) => boolean;
  maxHeight?: string | number;
  className?: string;
}
```

**Funkcjonalności**:
- Search filtering
- Async data loading
- Custom filtering
- Keyboard navigation
- Loading states
- Max height scrolling

### Wymagania implementacyjne

#### Dependencies
- Date handling: date-fns lub similar
- Rich text: może być lightweight custom solution
- File handling: native File API
- Color: własna implementacja z HSL/RGB conversion

#### Performance
- Debounced search dla AutoComplete
- Lazy loading dla RichTextEditor
- Virtual scrolling dla długich list opcji
- Memoization dla expensive calculations

#### Accessibility
- ARIA labels i roles
- Keyboard navigation dla wszystkich
- Focus management
- Screen reader support
- High contrast support

#### Mobile Support
- Touch-friendly sliders
- Mobile file picker
- Responsive layouts
- Touch gestures

### Kryteria akceptacji
1. ✅ Date validation działa poprawnie
2. ✅ File upload z progress tracking
3. ✅ Rich text formatting
4. ✅ Color picker accuracy
5. ✅ Slider smooth interactions
6. ✅ AutoComplete performance
7. ✅ Mobile usability
8. ✅ Accessibility compliance

### Timeline
- DatePicker: 6h
- FileUpload: 5h
- RichTextEditor: 8h
- ColorPicker: 4h
- Slider: 3h
- Switch: 2h
- Rate: 2h
- AutoComplete: 4h
- Testy wszystkich: 10h
- Stories wszystkich: 6h
- **Total: ~50h**
