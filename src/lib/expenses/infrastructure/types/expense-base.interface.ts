import { BaseId } from 'src/shared/infrastructure/base.type';

export interface ExpenseBase extends BaseId {
  userId: string;
  expenseDescription: string;
  expenseAmount: number;
  expenseType: string;
  customerId: string;
}
