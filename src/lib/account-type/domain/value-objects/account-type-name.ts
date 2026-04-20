import { ValueObject } from 'src/shared/domain/value-object';
import { ValidationError } from 'src/shared/errors/validation-error';

export class AccountTypeName extends ValueObject<string> {
  constructor(value: string) {
    const normalized = value.trim();

    super(normalized);

    this.ensureIsValidAccountType();
  }

  private ensureIsValidAccountType() {
    if (this.value === '') {
      throw new ValidationError('Tipo de cuenta del bancario es requerido');
    }

    if (this.value.length < 2 || this.value.length > 75) {
      throw new ValidationError(
        'Nombre de tipo de cuenta bancario debe estar entre 2 y 75 caracteres',
      );
    }

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;

    if (!nameRegex.test(this.value)) {
      throw new ValidationError(
        'Nombre dtipo de cuenta bancario contiene caracteres inválidos',
      );
    }
  }
}
