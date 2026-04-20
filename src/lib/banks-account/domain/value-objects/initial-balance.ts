import { ValueObject } from 'src/shared/domain/value-object';

export class InitialBalance extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value === null || this.value === undefined) {
      throw new Error('Saldo Inicial es requerido');
    }

    if (typeof this.value !== 'number' || isNaN(this.value)) {
      throw new Error('Sald inicial debe de ser numérico');
    }

    if (this.value < 0) {
      throw new Error('Saldo inicial no debe de ser negativo');
    }

    if (!this.hasTwoDecimals(this.value)) {
      throw new Error('Saldo inicial debe conter 2 decimales');
    }
  }

  private hasTwoDecimals(value: number): boolean {
    return Number(value.toFixed(2)) === value;
  }
}
