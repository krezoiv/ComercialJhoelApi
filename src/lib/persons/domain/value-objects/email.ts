import { ValueObject } from 'src/shared/domain/index-shared-domin';
import { ValidationError } from 'src/shared/errors/index-errors';

export class Email extends ValueObject<string> {
  constructor(value: string) {
    const normalized = value.trim().toLowerCase();

    super(normalized);

    this.ensureIsValidEmail();
  }

  private ensureIsValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.value)) {
      throw new ValidationError('Formatro de correo inválido');
    }

    if (this.value.length > 255) {
      throw new ValidationError('Correo no puede tener más de 255 caracteres');
    }
  }
}
