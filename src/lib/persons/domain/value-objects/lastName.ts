import { ValueObject } from 'src/shared/domain/index-shared-domin';
import { ValidationError } from 'src/shared/errors/index-errors';

export class LastName extends ValueObject<string> {
  constructor(value: string) {
    const normalized = value.trim();

    super(normalized);

    this.ensureIsValidLastName();
  }

  private ensureIsValidLastName() {
    if (this.value === '') {
      throw new ValidationError('apellido es requerido');
    }

    if (this.value.length < 2 || this.value.length > 50) {
      throw new ValidationError('apellido debe ser entre 2 y 50 caracteres');
    }

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;

    if (!nameRegex.test(this.value)) {
      throw new ValidationError('apellido contiene caracteres inválidos');
    }
  }
}
