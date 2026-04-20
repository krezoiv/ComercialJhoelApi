import { ValueObject } from 'src/shared/domain/index-shared-domin';

export class FinalBalance extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value < 0) {
      throw new Error('Final balance cannot be negative');
    }

    if (!this.hasTwoDecimals(this.value)) {
      throw new Error('Final balance must have max 2 decimals');
    }
  }

  private hasTwoDecimals(value: number): boolean {
    return Number(value.toFixed(2)) === value;
  }
}
