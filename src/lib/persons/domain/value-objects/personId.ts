import { ValueObject } from '../../../../shared/domain/value-object';
import { ValidationError } from '../../../../shared/errors/validation-error';

export class PersonId extends ValueObject<string> {
  constructor(value: string) {
    const normalized = value.toLowerCase();

    super(normalized);

    this.ensureIsValidPersonId();
  }

  private ensureIsValidPersonId() {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(this.value)) {
      throw new ValidationError('Invalid person ID format');
    }
  }
}
