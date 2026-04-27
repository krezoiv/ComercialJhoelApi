import { ValueObject } from 'src/shared/domain/index-shared-domin';

export class PaymentDate extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value) {
      throw new Error('Fecha inválida');
    }

    const inputDate = new Date(this.value + 'T00:00:00Z');

    const now = new Date();
    const today = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );

    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() - 1);

    if (inputDate < minDate) {
      throw new Error('No se permiten fechas pasadas');
    }

    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 5);

    if (inputDate > maxDate) {
      throw new Error('Máximo 5 días desde hoy');
    }
  }
}
