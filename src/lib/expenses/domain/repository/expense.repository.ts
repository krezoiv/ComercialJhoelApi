import { BaseRepository } from 'src/shared/domain/base-repository';
import { Expense, ExpenseId } from '../index-expenses-domain';
import { IGetExpenses } from '../../infrastructure/types/gets/get-expenses.interface';
import { IGetExpensesByCustomers } from '../../infrastructure/types/gets/get-expense-by-customers.interface';

export interface ExpenseRepository extends BaseRepository<Expense, ExpenseId> {
  getExpenses(): Promise<IGetExpenses[]>;
  getExpenseByCustomers(): Promise<IGetExpensesByCustomers[]>;
}
