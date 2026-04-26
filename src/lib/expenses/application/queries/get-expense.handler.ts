import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetExpenseQuery } from '../index-expense-application';
import { Inject } from '@nestjs/common';
import {
  EXPENSES_REPOSITORY,
  ExpenseRepository,
} from '../../domain/index-expenses-domain';

@QueryHandler(GetExpenseQuery)
export class GetExpenseHanlder implements IQueryHandler<GetExpenseQuery> {
  constructor(
    @Inject(EXPENSES_REPOSITORY)
    private readonly _expensesRepository: ExpenseRepository,
  ) {}

  async execute() {
    const expense = await this._expensesRepository.getExpenses();

    return expense.map((item) => ({
      id: item.id,
      description: item.description,
      amount: item.amount,
      customerId: item.customerId,
      firstName: item.firstName,
      lastName: item.lastName,
      phoneNumber: item.phoneNumber,
      enmail: item.email,
      userId: item.userId,
      userName: item.userName,
      personId: item.personId,
      expenseType: item.expenseType,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  }
}
