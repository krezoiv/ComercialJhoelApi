import { randomUUID } from 'crypto';
import {
  Expense,
  ExpenseAmount,
  ExpenseDescription,
  ExpenseId,
} from '../../domain/index-expenses-domain';
import { CreateExpenseInput } from '../../infrastructure/index-expense-infrastructure';
import { UserId } from 'src/lib/users/index-users-domain';
import { CustomerId } from 'src/lib/customers/domain/index-domain';
import { ExpenseType } from '../../domain/value-objects/expense-type';

export class ExpenseMapper {
  static toEntity(input: CreateExpenseInput): Expense {
    const id = new ExpenseId(randomUUID());
    const userId = new UserId(input.userId);
    const customerId = new CustomerId(input.customerId);
    const expenseAmount = new ExpenseAmount(input.expenseAmount);
    const expenseDescription = new ExpenseDescription(input.expenseDescription);
    const expenseType = new ExpenseType(input.expenseType);
    const now = new Date();

    return new Expense(
      id,
      userId,
      customerId,
      expenseDescription,
      expenseAmount,
      expenseType,
      now,
      now,
    );
  }

  static toResponseDto(expense: Expense) {
    return {
      id: expense.id.value,
      userId: expense.userId.value,
      expenseAmount: expense.amount.value,
      expenseDescription: expense.description,
      expenseType: expense.expenseType,
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt,
    };
  }
}
