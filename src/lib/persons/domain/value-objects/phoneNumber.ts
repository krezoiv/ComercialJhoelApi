import { ValueObject } from '../../../../shared/domain/value-object';
import { ValidationError } from '../../../../shared/errors/validation-error';

export class PhoneNumber extends ValueObject<string> {
  constructor(value: string) {
    const normalized = value.replace(/\s/g, '');

    super(normalized);

    this.ensureIsValidPhoneNumber();
  }

  private ensureIsValidPhoneNumber() {
    const phoneRegex = /^\d{8}$/;

    if (!phoneRegex.test(this.value)) {
      throw new ValidationError('Invalid phone number format');
    }
  }
}
