import { ValueObject } from 'src/shared/domain/index-shared-domin';

export class ExpenseDescription extends ValueObject<string> {
  constructor(value: string) {
    super(value?.trim());
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value) {
      throw new Error('Descripción es requerida');
    }

    if (this.value.length < 3) {
      throw new Error('Descripción debe tener al menos 3 caracteres');
    }

    if (this.value.length > 255) {
      throw new Error('Descripción no puede exceder 255 caracteres');
    }
  }
}
