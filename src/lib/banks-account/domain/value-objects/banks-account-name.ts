import { ValueObject } from 'src/shared/domain/index-shared-domin';

export class BankAccountName extends ValueObject<string> {
  constructor(value: string) {
    super(value.trim());
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value) {
      throw new Error('Nombre de la cuenta es obligatoria');
    }

    if (this.value.length < 3 || this.value.length > 100) {
      throw new Error('Nombre de la cuenta debe ser entre 3 y 100 caracteres');
    }

    // 🔥 Solo letras, números, espacios (puedes ampliar si quieres)
    const regex = /^[a-zA-Z0-9\s]+$/;

    if (!regex.test(this.value)) {
      throw new Error(
        'Nombre de la cuenta solo puede contener letras y números',
      );
    }
  }
}
