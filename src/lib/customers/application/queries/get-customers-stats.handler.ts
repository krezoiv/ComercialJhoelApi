import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomerStatsQuery } from './get-customers-stats.query';
import { Inject } from '@nestjs/common';
import {
  CUSTOMERS_REPOSITORY,
  CustomersRepository,
} from '../../domain/index-domain';

@QueryHandler(GetCustomerStatsQuery)
export class GetCustomerStatsHandler implements IQueryHandler<GetCustomerStatsQuery> {
  constructor(
    @Inject(CUSTOMERS_REPOSITORY)
    private readonly _customerRepository: CustomersRepository,
  ) {}

  async execute() {
    const customerStats = await this._customerRepository.getCustomerStats();
    return customerStats.map((item) => ({
      id: item.id,
      customerId: item.customerId,
      firstName: item.firstName,
      lastName: item.lastName,
      phone: item.phone,
      email: item.email,

      // 🔥 EXPENSES
      totalExpenses: item.totalExpenses,
      totalExpensesAmount: item.totalExpensesAmount, // ✅ correcto

      firstExpenseDate: item.firstExpenseDate,
      lastExpenseDate: item.lastExpenseDate,

      // 🔥 BANK AGENTS
      totalBankAgent: item.totalBankAgent, // ✅ nuevo
      totalBankAgentAmount: item.totalBankAgentAmount, // ✅ nuevo

      firstPaymentDate: item.firstPaymentDate,
      lastPaymentDate: item.lastPaymentDate,
    }));
  }
}
