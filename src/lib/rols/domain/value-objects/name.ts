import { ValueObject } from 'src/shared/domain/index-shared-domin';

export class Name extends ValueObject<string> {
  constructor(value: string) {
    const normalized = value.trim();
    super(normalized);
    this.ensuereIsValidName();
  }

  private ensuereIsValidName() {
    if (this.value === '') {
      throw new Error('Name cannot be empty');
    }

    if (this.value.length < 2 || this.value.length > 50) {
      throw new Error('Name must be between 2 and 50 characters');
    }

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;

    if (!nameRegex.test(this.value)) {
      throw new Error('Name contains invalid characters');
    }
  }
}
