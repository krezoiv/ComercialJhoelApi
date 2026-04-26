import { ExpenseBase } from '../expense-base.interface';

export type CreateExpenseInput = Omit<ExpenseBase, 'id'>;
