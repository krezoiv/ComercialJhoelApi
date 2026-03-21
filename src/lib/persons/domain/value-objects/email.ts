import { ValueObject } from '../../../../shared/domain/value-object';
import { ValidationError } from '../../../../shared/errors/validation-error';

export class Email extends ValueObject<string> {
  constructor(value: string) {
    const normalized = value.trim().toLowerCase();

    super(normalized);

    this.ensureIsValidEmail();
  }

  private ensureIsValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.value)) {
      throw new ValidationError('Invalid email format');
    }

    if (this.value.length > 255) {
      throw new ValidationError('Email too long');
    }
  }
}
