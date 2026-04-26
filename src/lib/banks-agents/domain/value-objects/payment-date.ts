import { ValueObject } from 'src/shared/domain/index-shared-domin';

export class PaymentDate extends ValueObject<Date> {
  constructor(value: Date) {
    super(value);
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value) {
      throw new Error('Fecha de pago es requerida');
    }

    if (!(this.value instanceof Date)) {
      throw new Error('Fecha de pago debe ser una fecha válida');
    }

    if (isNaN(this.value.getTime())) {
      throw new Error('Fecha de pago inválida');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const inputDate = new Date(this.value);
    inputDate.setHours(0, 0, 0, 0);

    // ❌ No permitir fechas pasadas
    if (inputDate < today) {
      throw new Error('No se permiten fechas pasadas');
    }

    // ❌ No permitir más de 5 días hacia el futuro
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 5);

    if (inputDate > maxDate) {
      throw new Error('La fecha no puede ser mayor a 5 días desde hoy');
    }
  }
}
