import { ValueObject } from '../../../../shared/domain/value-object';
import { ValidationError } from '../../../../shared/errors/validation-error';

export class LastName extends ValueObject<string> {
  constructor(value: string) {
    const normalized = value.trim();

    super(normalized);

    this.ensureIsValidLastName();
  }

  private ensureIsValidLastName() {
    if (this.value === '') {
      throw new ValidationError('Last name cannot be empty');
    }

    if (this.value.length < 2 || this.value.length > 50) {
      throw new ValidationError(
        'Last name must be between 2 and 50 characters',
      );
    }

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;

    if (!nameRegex.test(this.value)) {
      throw new ValidationError('Last name contains invalid characters');
    }
  }
}
