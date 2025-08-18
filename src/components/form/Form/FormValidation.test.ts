import { describe, it, expect, beforeEach } from 'vitest';
import { FormValidator, ValidationRule } from './FormValidation';

describe('FormValidator', () => {
  let validator: FormValidator;

  beforeEach(() => {
    validator = new FormValidator();
  });

  describe('validateField', () => {
    it('should return null for valid required field', () => {
      const rules: ValidationRule = { required: true };
      expect(validator.validateField('test', rules)).toBe(null);
    });

    it('should return error for missing required field', () => {
      const rules: ValidationRule = { required: true };
      expect(validator.validateField('', rules)).toBe('To pole jest wymagane');
      expect(validator.validateField(null, rules)).toBe(
        'To pole jest wymagane'
      );
      expect(validator.validateField(undefined, rules)).toBe(
        'To pole jest wymagane'
      );
    });

    it('should validate minLength rule', () => {
      const rules: ValidationRule = { minLength: 5 };
      expect(validator.validateField('test', rules)).toBe(
        'Minimalna długość to 5 znaków'
      );
      expect(validator.validateField('testing', rules)).toBe(null);
    });

    it('should validate maxLength rule', () => {
      const rules: ValidationRule = { maxLength: 5 };
      expect(validator.validateField('testing', rules)).toBe(
        'Maksymalna długość to 5 znaków'
      );
      expect(validator.validateField('test', rules)).toBe(null);
    });

    it('should validate pattern rule', () => {
      const rules: ValidationRule = { pattern: /^[A-Z]+$/ };
      expect(validator.validateField('abc', rules)).toBe(
        'Nieprawidłowy format'
      );
      expect(validator.validateField('ABC', rules)).toBe(null);
    });

    it('should validate custom rule', () => {
      const rules: ValidationRule = {
        custom: (value) => (value === 'valid' ? null : 'Custom error'),
      };
      expect(validator.validateField('invalid', rules)).toBe('Custom error');
      expect(validator.validateField('valid', rules)).toBe(null);
    });

    it('should handle empty rules', () => {
      const rules: ValidationRule = {};
      expect(validator.validateField('test', rules)).toBe(null);
    });

    it('should handle null/undefined values with non-required fields', () => {
      const rules: ValidationRule = { minLength: 5 };
      expect(validator.validateField(null, rules)).toBe(null);
      expect(validator.validateField(undefined, rules)).toBe(null);
    });
  });

  describe('validate', () => {
    it('should validate multiple fields', () => {
      validator.addField('name', { required: true, minLength: 3 });
      validator.addField('email', { required: true });

      const result = validator.validate({
        name: 'John',
        email: 'john@example.com',
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should return errors for invalid fields', () => {
      validator.addField('name', { required: true, minLength: 5 });
      validator.addField('email', { required: true });

      const result = validator.validate({
        name: 'Jo',
        email: '',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe('Minimalna długość to 5 znaków');
      expect(result.errors.email).toBe('To pole jest wymagane');
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validator.validateEmail('test@example.com')).toBe(null);
      expect(validator.validateEmail('user.name@domain.co.uk')).toBe(null);
    });

    it('should return error for invalid email', () => {
      expect(validator.validateEmail('invalid-email')).toBe(
        'Nieprawidłowy adres email'
      );
      expect(validator.validateEmail('@example.com')).toBe(
        'Nieprawidłowy adres email'
      );
    });
  });

  describe('validatePhone', () => {
    it('should validate correct phone numbers', () => {
      expect(validator.validatePhone('123456789')).toBe(null);
      expect(validator.validatePhone('+48123456789')).toBe(null);
      expect(validator.validatePhone('123 456 789')).toBe(null);
    });

    it('should return error for invalid phone', () => {
      expect(validator.validatePhone('123')).toBe(
        'Nieprawidłowy numer telefonu'
      );
      expect(validator.validatePhone('abcdefghijk')).toBe(
        'Nieprawidłowy numer telefonu'
      );
    });
  });

  describe('validatePassword', () => {
    it('should validate strong password', () => {
      expect(validator.validatePassword('StrongPass123')).toBe(null);
    });

    it('should return error for weak passwords', () => {
      expect(validator.validatePassword('weak')).toBe(
        'Hasło musi mieć co najmniej 8 znaków'
      );
      expect(validator.validatePassword('nouppercase123')).toBe(
        'Hasło musi zawierać co najmniej jedną wielką literę'
      );
      expect(validator.validatePassword('NOLOWERCASE123')).toBe(
        'Hasło musi zawierać co najmniej jedną małą literę'
      );
      expect(validator.validatePassword('NoNumbers')).toBe(
        'Hasło musi zawierać co najmniej jedną cyfrę'
      );
    });
  });

  describe('validatePolishPostalCode', () => {
    it('should validate correct postal code', () => {
      expect(validator.validatePolishPostalCode('12-345')).toBe(null);
      expect(validator.validatePolishPostalCode('00-001')).toBe(null);
    });

    it('should return error for invalid postal code', () => {
      expect(validator.validatePolishPostalCode('12345')).toBe(
        'Nieprawidłowy format kodu pocztowego (XX-XXX)'
      );
      expect(validator.validatePolishPostalCode('12-3456')).toBe(
        'Nieprawidłowy format kodu pocztowego (XX-XXX)'
      );
    });
  });

  describe('validatePESEL', () => {
    it('should validate correct PESEL', () => {
      expect(validator.validatePESEL('44051401359')).toBe(null);
    });

    it('should return error for invalid PESEL', () => {
      expect(validator.validatePESEL('123')).toBe('PESEL musi mieć 11 cyfr');
      expect(validator.validatePESEL('12345678901')).toBe(
        'Nieprawidłowy numer PESEL'
      );
    });
  });

  describe('validateNIP', () => {
    it('should validate correct NIP', () => {
      expect(validator.validateNIP('1234563218')).toBe(null);
    });

    it('should return error for invalid NIP', () => {
      expect(validator.validateNIP('123')).toBe('NIP musi mieć 10 cyfr');
      expect(validator.validateNIP('1234567890')).toBe(
        'Nieprawidłowy numer NIP'
      );
    });
  });

  describe('addField and removeField', () => {
    it('should add and remove validation rules', () => {
      validator.addField('test', { required: true });
      expect(validator.validate({ test: '' }).isValid).toBe(false);

      validator.removeField('test');
      expect(validator.validate({ test: '' }).isValid).toBe(true);
    });
  });

  describe('private methods', () => {
    it('should correctly identify required missing values', () => {
      // @ts-ignore - testing private method
      expect(validator.isRequiredMissing('', { required: true })).toBe(true);
      // @ts-ignore - testing private method
      expect(validator.isRequiredMissing('value', { required: true })).toBe(
        false
      );
      // @ts-ignore - testing private method
      expect(validator.isRequiredMissing('', { required: false })).toBe(false);
    });

    it('should correctly check if value exists', () => {
      // @ts-ignore - testing private method
      expect(validator.hasValue(null)).toBe(false);
      // @ts-ignore - testing private method
      expect(validator.hasValue(undefined)).toBe(false);
      // @ts-ignore - testing private method
      expect(validator.hasValue('')).toBe(true);
      // @ts-ignore - testing private method
      expect(validator.hasValue(0)).toBe(true);
    });

    it('should validate rules correctly', () => {
      // @ts-ignore - testing private method
      expect(validator.validateRules('test', { minLength: 5 })).toBe(
        'Minimalna długość to 5 znaków'
      );
      // @ts-ignore - testing private method
      expect(validator.validateRules('testing', { minLength: 5 })).toBe(null);
    });

    it('should handle custom validation', () => {
      const customRule = { custom: (v: any) => (v === 'ok' ? null : 'error') };
      // @ts-ignore - testing private method
      expect(validator.validateCustom('bad', customRule)).toBe('error');
      // @ts-ignore - testing private method
      expect(validator.validateCustom('ok', customRule)).toBe(null);
    });
  });
});
