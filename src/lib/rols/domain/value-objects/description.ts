import { ValueObject } from 'src/shared/domain/index-shared-domin';

export class Description extends ValueObject<string> {
  constructor(value: string) {
    const normalized = value.trim();
    super(normalized);
    this.ensuereIsValidDescription();
  }

  private ensuereIsValidDescription() {
    if (this.value === '') {
      throw new Error('Description cannot be empty');
    }

    if (this.value.length < 5 || this.value.length > 255) {
      throw new Error('Description must be between 5 and 255 characters');
    }
  }
}
