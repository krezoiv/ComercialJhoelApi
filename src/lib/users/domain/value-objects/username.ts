import { ValueObject } from 'src/shared/domain/index-shared-domin';
import { ValidationError } from 'src/shared/errors/index-errors';

export class Username extends ValueObject<string> {
  constructor(value: string) {
    const normalized = value.trim().toLowerCase();

    super(normalized);

    this.ensureIsValidUsername();
  }

  private ensureIsValidUsername() {
    if (this.value === '') {
      throw new ValidationError('Nombre de usuario es requerido');
    }

    if (this.value.length < 3 || this.value.length > 50) {
      throw new ValidationError('Usuario debe ser entre 3 y 50 caracteres');
    }

    const usernameRegex = /^[a-z0-9._]+$/;

    if (!usernameRegex.test(this.value)) {
      throw new ValidationError(
        'Usuario solo puede contener letras, números, ".", "_"',
      );
    }
  }
}
