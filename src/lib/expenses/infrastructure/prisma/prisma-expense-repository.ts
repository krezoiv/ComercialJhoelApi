import { Injectable } from '@nestjs/common';
import {
  Expense,
  ExpenseAmount,
  ExpenseDescription,
  ExpenseId,
  ExpenseRepository,
} from '../../domain/index-expenses-domain';
import { CreateExpenseSp } from '../stored-procedures/create-expense.sp';
import {
  ConflictError,
  DomainError,
  ValidationError,
} from 'src/shared/errors/index-errors';
import { UserId } from 'src/lib/users/index-users-domain';
import { CustomerId } from 'src/lib/customers/domain/index-domain';

import { GetExpenseSp } from '../stored-procedures/get-expense.sp';
import { IGetExpenses } from '../types/gets/get-expenses.interface';
import {
  GetExpenseByCustomersSp,
  IGetExpensesByCustomers,
} from '../index-expense-infrastructure';
import { ExpenseType } from '../../domain/value-objects/expense-type';

@Injectable()
export class PrismaExpenseRepository implements ExpenseRepository {
  constructor(
    private readonly _createExpenseSp: CreateExpenseSp,
    private readonly _getExpensesSp: GetExpenseSp,
    private readonly _getExpensesByCustomersSp: GetExpenseByCustomersSp,
  ) {}

  async getExpenses(): Promise<IGetExpenses[]> {
    return this._getExpensesSp.execute();
  }

  async getExpenseByCustomers(): Promise<IGetExpensesByCustomers[]> {
    return this._getExpensesByCustomersSp.execute();
  }

  findAll(): Promise<Expense[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: ExpenseId): Promise<Expense | null> {
    throw new Error('Method not implemented.');
  }
  update(entity: Expense): Promise<Expense> {
    throw new Error('Method not implemented.');
  }
  delete(id: ExpenseId): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async create(expense: Expense): Promise<Expense> {
    try {
      const result = await this._createExpenseSp.execute({
        expenseDescription: expense.description.value,
        customerId: expense.customerId.value,
        userId: expense.userId.value,
        expenseAmount: expense.amount.value,
        expenseType: expense.expenseType.value,
      });

      const created = result[0];

      if (!created) {
        throw new Error('No response from database');
      }
      if (created.code !== 200) {
        switch (created.code) {
          case 400:
            throw new ValidationError(created.message);

          case 409:
            throw new ConflictError(created.message);

          default:
            throw new DomainError(created.message);
        }
      }

      return new Expense(
        new ExpenseId(created.id),
        new CustomerId(created.customerId),
        new UserId(created.userId),
        new ExpenseDescription(created.expenseDescription),
        new ExpenseAmount(Number(created.expenseAmount)),
        new ExpenseType(created.expenseType),
        new Date(created.createdAt),
        new Date(created.updatedAt),
        created.deletedAt ? new Date(created.deletedAt) : null,
      );
    } catch (error) {
      console.error(error);
      if (
        error instanceof ConflictError ||
        error instanceof ValidationError ||
        error instanceof DomainError
      ) {
        throw error;
      }

      // 👇 error inesperado
      throw new DomainError('Unexpected error creating expense');
    }
  }
}
