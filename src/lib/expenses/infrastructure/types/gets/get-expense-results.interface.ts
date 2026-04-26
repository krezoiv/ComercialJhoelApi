import { BaseAudit, SpResponse } from 'src/shared/infrastructure/base.type';
import { ExpenseBase } from '../expense-base.interface';

export interface GetExpenseResult extends ExpenseBase, BaseAudit, SpResponse {
  id: string;
  description: string;
  amount: string;
  personId: string;
  userId: string;
  expenseType: string;
}
