import { useState, useRef, useEffect, useMemo } from 'preact/hooks';
import { cn } from '../../../utils/cn';

export interface AutoCompleteOption {
  /** Option value */
  value: string;
  /** Display label */
  label: string;
  /** Disable option */
  disabled?: boolean;
}

export interface AutoCompleteProps {
  /** Current input value */
  value: string;
  /** Callback when value changes */
  onChange: (value: string) => void;
  /** Available options */
  options: readonly AutoCompleteOption[];
  /** Search callback for async data */
  onSearch?: (searchText: string) => void;
  /** Input placeholder */
  placeholder?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disable component */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Custom filter function */
  filterOption?: (inputValue: string, option: AutoCompleteOption) => boolean;
  /** Max height of dropdown */
  maxHeight?: string | number;
  /** Additional CSS class */
  className?: string;
}

/**
 * AutoComplete component with search and filtering
 *
 * @example
 * ```tsx
 * <AutoComplete
 *   value={searchTerm}
 *   onChange={setSearchTerm}
 *   options={cities}
 *   placeholder="Search cities..."
 *   onSearch={handleSearch}
 * />
 * ```
 */
export function AutoComplete({
  value,
  onChange,
  options,
  onSearch,
  placeholder,
  size = 'md',
  disabled = false,
  loading = false,
  filterOption,
  maxHeight = 200,
  className,
}: Readonly<AutoCompleteProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [searchValue, setSearchValue] = useState(value);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-3 py-2',
    lg: 'text-lg px-4 py-3',
  };

  // Default filter function
  const defaultFilter = (
    inputValue: string,
    option: AutoCompleteOption
  ): boolean => {
    return (
      option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
      option.value.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // Filter options based on search value
  const filteredOptions = useMemo(() => {
    if (!searchValue) return options.slice(0, 10); // Limit initial results

    const filter = filterOption || defaultFilter;
    return options.filter((option) => filter(searchValue, option)).slice(0, 50); // Limit results
  }, [searchValue, options, filterOption]);

  // Handle input change
  const handleInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;

    setSearchValue(newValue);
    onChange(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);

    // Trigger search callback
    onSearch?.(newValue);
  };

  // Handle option selection
  const handleOptionSelect = (option: AutoCompleteOption) => {
    if (option.disabled) return;

    setSearchValue(option.label);
    onChange(option.value);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;

      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;

      case 'Enter':
        event.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        }
        break;

      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle focus
  const handleFocus = () => {
    setIsOpen(true);
  };

  // Handle blur
  const handleBlur = (event: FocusEvent) => {
    // Don't close if clicking on an option
    const relatedTarget = event.relatedTarget as Element;
    if (relatedTarget && containerRef.current?.contains(relatedTarget)) {
      return;
    }

    setTimeout(() => {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }, 100);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      if (highlightedElement && highlightedElement.scrollIntoView) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [highlightedIndex]);

  // Update search value when prop changes
  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  return (
    <div className={cn('relative', className)} ref={containerRef}>
      {/* Input Field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
            sizeClasses[size],
            disabled &&
              'bg-gray-50 dark:bg-gray-800 text-gray-500 cursor-not-allowed',
            loading && 'pr-8'
          )}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={isOpen ? 'autocomplete-listbox' : undefined}
          aria-describedby={isOpen ? 'autocomplete-listbox' : undefined}
        />

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
          </div>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-gray-500 dark:text-gray-400 text-center">
              {loading ? 'Loading...' : 'No results found'}
            </div>
          ) : (
            <div
              ref={listRef}
              id="autocomplete-listbox"
              className="max-h-60 overflow-y-auto"
              style={{
                maxHeight:
                  typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
              }}
            >
              {filteredOptions.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  disabled={option.disabled}
                  className={cn(
                    'w-full text-left px-3 py-2 cursor-pointer text-gray-900 dark:text-gray-100 transition-colors focus:outline-none focus:bg-blue-50 dark:focus:bg-blue-900/50',
                    highlightedIndex === index &&
                      'bg-blue-50 dark:bg-blue-900/50',
                    option.disabled &&
                      'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  )}
                  onClick={() => handleOptionSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        option.label !== option.value && 'font-medium'
                      )}
                    >
                      {option.label}
                    </span>
                    {option.label !== option.value && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {option.value}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
