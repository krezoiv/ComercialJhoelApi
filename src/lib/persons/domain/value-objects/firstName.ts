import { ValueObject } from '../../../../shared/domain/value-object';
import { ValidationError } from '../../../../shared/errors/validation-error';

export class FirstName extends ValueObject<string> {
  constructor(value: string) {
    const normalized = value.trim();

    super(normalized);

    this.ensureIsValidFirstName();
  }

  private ensureIsValidFirstName() {
    if (this.value === '') {
      throw new ValidationError('First name cannot be empty');
    }

    if (this.value.length < 2 || this.value.length > 50) {
      throw new ValidationError(
        'First name must be between 2 and 50 characters',
      );
    }

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;

    if (!nameRegex.test(this.value)) {
      throw new ValidationError('First name contains invalid characters');
    }
  }
}
