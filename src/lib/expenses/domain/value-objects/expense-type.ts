import { ValueObject } from 'src/shared/domain/index-shared-domin';
import { ExpensesTypeList } from '../../infrastructure/types/expense-type.enum';

export class ExpenseType extends ValueObject<string> {
  constructor(value: string) {
    super(value?.trim());
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value) {
      throw new Error('Tipo de gasto es requerido');
    }

    const validValues = Object.values(ExpensesTypeList);

    if (!validValues.includes(this.value as ExpensesTypeList)) {
      throw new Error(`Tipo de gasto inválido: ${this.value}`);
    }
  }
}
