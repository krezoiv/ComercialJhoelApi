import { ValidationError } from '../errors/validation-error';
import { ValueObject } from './value-object';

export abstract class UuidValueObject extends ValueObject<string> {
  constructor(value: string) {
    const normalized = value?.toLowerCase();
    super(normalized);

    this.ensureIsValidUuid();
  }

  private ensureIsValidUuid() {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(this.value)) {
      throw new ValidationError('Invalid UUID format');
    }
  }
}
