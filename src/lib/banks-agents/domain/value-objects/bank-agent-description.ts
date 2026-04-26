import { ValueObject } from 'src/shared/domain/index-shared-domin';

export class BankAgentDescription extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value) {
      throw new Error('Descripción es requerida');
    }

    if (typeof this.value !== 'string') {
      throw new Error('Descripción debe ser texto');
    }

    if (this.value.trim().length === 0) {
      throw new Error('Descripción no puede estar vacía');
    }

    if (this.value.length > 255) {
      throw new Error('Descripción no puede exceder 255 caracteres');
    }
  }
}
