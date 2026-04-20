import { ValueObject } from 'src/shared/domain/value-object';
import { ValidationError } from 'src/shared/errors/validation-error';

export class BankName extends ValueObject<string> {
  constructor(value: string) {
    const normalized = value.trim();

    super(normalized);

    this.ensureIsValidBankName();
  }

  private ensureIsValidBankName() {
    if (this.value === '') {
      throw new ValidationError('Nombre del banco es requerido');
    }

    if (this.value.length < 2 || this.value.length > 75) {
      throw new ValidationError(
        'Nombre del banco debe estar entre 2 y 75 caracteres',
      );
    }

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;

    if (!nameRegex.test(this.value)) {
      throw new ValidationError(
        'Nombre del banco contiene caracteres inválidos',
      );
    }
  }
}
