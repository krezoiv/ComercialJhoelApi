import { ValueObject } from 'src/shared/domain/index-shared-domin';

export class BankAgentAmount extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value === null || this.value === undefined) {
      throw new Error('Monto es requerido');
    }

    if (typeof this.value !== 'number') {
      throw new Error('Monto debe ser un número');
    }

    if (isNaN(this.value)) {
      throw new Error('Monto debe ser un número válido');
    }

    if (this.value <= 0) {
      throw new Error('Monto debe ser mayor que 0');
    }

    if (this.value > 999999999999) {
      throw new Error('Monto es muy grande');
    }

    if (!Number.isFinite(this.value)) {
      throw new Error('Monto debe ser un número finito');
    }

    if (!/^\d+(\.\d{1,2})?$/.test(this.value.toString())) {
      throw new Error('Monto debe tener como máximo 2 decimales');
    }
  }
}
