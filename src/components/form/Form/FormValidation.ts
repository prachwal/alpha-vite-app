export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface FormFieldValidation {
  field: string;
  rules: ValidationRule;
}

export class FormValidator {
  private readonly validations: Map<string, ValidationRule> = new Map();

  addField(field: string, rules: ValidationRule): void {
    this.validations.set(field, rules);
  }

  removeField(field: string): void {
    this.validations.delete(field);
  }

  validate(values: Record<string, any>): FormValidationResult {
    const errors: Record<string, string> = {};
    let isValid = true;

    for (const [field, rules] of this.validations) {
      const value = values[field];
      const error = this.validateField(value, rules);

      if (error) {
        errors[field] = error;
        isValid = false;
      }
    }

    return { isValid, errors };
  }

  validateField(value: any, rules: ValidationRule): string | null {
    if (this.isRequiredMissing(value, rules)) {
      return "To pole jest wymagane";
    }

    if (!this.hasValue(value)) {
      return null;
    }

    const stringValue = String(value);

    return (
      this.validateRules(stringValue, rules) ||
      this.validateCustom(value, rules)
    );
  }

  private isRequiredMissing(value: any, rules: ValidationRule): boolean {
    return Boolean(
      rules.required && (value === undefined || value === null || value === "")
    );
  }

  private hasValue(value: any): boolean {
    return value !== undefined && value !== null;
  }

  private validateRules(value: string, rules: ValidationRule): string | null {
    if (rules.minLength && value.length < rules.minLength) {
      return `Minimalna długość to ${rules.minLength} znaków`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Maksymalna długość to ${rules.maxLength} znaków`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return "Nieprawidłowy format";
    }

    return null;
  }

  private validateCustom(value: any, rules: ValidationRule): string | null {
    if (!rules.custom) {
      return null;
    }

    const customError = rules.custom(value);
    return customError || null;
  }

  validateEmail(email: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Nieprawidłowy adres email";
    }
    return null;
  }

  validatePhone(phone: string): string | null {
    const phoneRegex = /^\+?\d{9,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      return "Nieprawidłowy numer telefonu";
    }
    return null;
  }

  validatePassword(password: string): string | null {
    if (password.length < 8) {
      return "Hasło musi mieć co najmniej 8 znaków";
    }

    if (!/[A-Z]/.test(password)) {
      return "Hasło musi zawierać co najmniej jedną wielką literę";
    }

    if (!/[a-z]/.test(password)) {
      return "Hasło musi zawierać co najmniej jedną małą literę";
    }

    if (!/\d/.test(password)) {
      return "Hasło musi zawierać co najmniej jedną cyfrę";
    }

    return null;
  }

  validatePolishPostalCode(code: string): string | null {
    const postalCodeRegex = /^\d{2}-\d{3}$/;
    if (!postalCodeRegex.test(code)) {
      return "Nieprawidłowy format kodu pocztowego (XX-XXX)";
    }
    return null;
  }

  validatePESEL(pesel: string): string | null {
    if (!/^\d{11}$/.test(pesel)) {
      return "PESEL musi mieć 11 cyfr";
    }

    // PESEL validation algorithm
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    const digits = pesel.split("").map(Number);

    let sum = 0;
    for (let i = 0; i < 10; i++) {
      const digit = digits[i] || 0;
      const weight = weights[i] || 0;
      sum += digit * weight;
    }

    const control = (10 - (sum % 10)) % 10;

    if (digits.length > 10 && control !== digits[10]) {
      return "Nieprawidłowy numer PESEL";
    }

    return null;
  }

  validateNIP(nip: string): string | null {
    if (!/^\d{10}$/.test(nip)) {
      return "NIP musi mieć 10 cyfr";
    }

    const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    const digits = nip.split("").map(Number);

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      const digit = digits[i] || 0;
      const weight = weights[i] || 0;
      sum += digit * weight;
    }

    const control = sum % 11;

    if (digits.length > 9 && control !== digits[9]) {
      return "Nieprawidłowy numer NIP";
    }

    return null;
  }
}

// Utility functions for common validations
export const validators = {
  required: (value: any) =>
    value !== undefined && value !== null && value !== "",
  email: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  phone: (phone: string) => /^\+?\d{9,15}$/.test(phone.replace(/\s/g, "")),
  url: (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
  number: (value: any) => !isNaN(Number(value)) && isFinite(Number(value)),
  integer: (value: any) => Number.isInteger(Number(value)),
  positive: (value: any) => Number(value) > 0,
  min: (min: number) => (value: any) => Number(value) >= min,
  max: (max: number) => (value: any) => Number(value) <= max,
  length: (min: number, max?: number) => (value: string) => {
    const len = value.length;
    return max ? len >= min && len <= max : len >= min;
  },
  pattern: (regex: RegExp) => (value: string) => regex.test(value),
};

// Predefined validation rules
export const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) =>
      validators.email(value) ? null : "Nieprawidłowy adres email",
  },
  phone: {
    required: true,
    custom: (value: string) =>
      validators.phone(value) ? null : "Nieprawidłowy numer telefonu",
  },
  password: {
    required: true,
    minLength: 8,
    custom: (value: string) => new FormValidator().validatePassword(value),
  },
  postalCode: {
    required: true,
    pattern: /^\d{2}-\d{3}$/,
    custom: (value: string) =>
      new FormValidator().validatePolishPostalCode(value),
  },
  pesel: {
    required: true,
    custom: (value: string) => new FormValidator().validatePESEL(value),
  },
  nip: {
    required: true,
    custom: (value: string) => new FormValidator().validateNIP(value),
  },
};
