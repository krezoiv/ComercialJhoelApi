import { BaseAudit, SpResponse } from 'src/shared/infrastructure/base.type';
import { ExpenseBase } from '../expense-base.interface';

export interface CreateExpenseResult
  extends ExpenseBase, BaseAudit, SpResponse {}
