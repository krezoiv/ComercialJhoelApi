import { ValueObject } from 'src/shared/domain/index-shared-domin';
import { ValidationError } from 'src/shared/errors/index-errors';

export class PasswordHash extends ValueObject<string> {
  static value: string;
  constructor(value: string) {
    const normalized = value.trim();

    super(normalized);

    this.ensureIsValidHash();
  }

  private ensureIsValidHash() {
    if (this.value === '') {
      throw new ValidationError('Password hash es requerido');
    }

    // 🔥 Longitud típica bcrypt (60), pero dejamos rango seguro
    if (this.value.length < 50 || this.value.length > 255) {
      throw new ValidationError('Password hash inválido');
    }

    // 🔥 Validar formato bcrypt
    const bcryptRegex = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;

    if (!bcryptRegex.test(this.value)) {
      throw new ValidationError('Formato de password hash inválido');
    }

    // 🔥 Validar rounds (cost factor)
    const parts = this.value.split('$');
    // formato: $2b$10$...
    const rounds = parseInt(parts[2], 10);

    if (isNaN(rounds)) {
      throw new ValidationError('Rounds de bcrypt inválidos');
    }

    // 🔥 Seguridad mínima recomendada
    if (rounds < 10) {
      throw new ValidationError(
        'Hash inseguro: rounds de bcrypt demasiado bajos (mínimo 10)',
      );
    }

    // 🔥 (Opcional PRO) evitar costos absurdos
    if (rounds > 15) {
      throw new ValidationError(
        'Hash inválido: rounds de bcrypt demasiado altos',
      );
    }
  }
}
