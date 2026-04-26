import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetExpensesByCustomersQuery } from './get-expenses-by-customers.query';
import {
  EXPENSES_REPOSITORY,
  ExpenseRepository,
} from '../../domain/index-expenses-domain';
import { Inject } from '@nestjs/common';

@QueryHandler(GetExpensesByCustomersQuery)
export class GetExpensesByCustomersHandler implements IQueryHandler<GetExpensesByCustomersQuery> {
  constructor(
    @Inject(EXPENSES_REPOSITORY)
    private readonly _expenseRepository: ExpenseRepository,
  ) {}

  async execute() {
    const expense = await this._expenseRepository.getExpenseByCustomers();
    return expense.map((item) => ({
      id: item.id,
      customerId: item.customerId,
      firstName: item.firstName,
      lastName: item.lastName,
      phone: item.phone,
      email: item.email,
      totalExpenses: item.totalExpenses,
      totalAmount: item.totalAmount,
      firstExpenseDate: item.firstExpenseDate,
      lastExpenseDate: item.lastExpenseDate,
    }));
  }
}
