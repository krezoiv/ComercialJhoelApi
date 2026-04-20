import { ValueObject } from 'src/shared/domain/index-shared-domin';

export class BankAccountNumber extends ValueObject<string> {
  constructor(value: string) {
    super(value.trim());
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value) {
      throw new Error('Account number cannot be empty');
    }

    if (this.value.length < 10 || this.value.length > 25) {
      throw new Error('Account number must be between 10 and 25 characters');
    }
  }
}
