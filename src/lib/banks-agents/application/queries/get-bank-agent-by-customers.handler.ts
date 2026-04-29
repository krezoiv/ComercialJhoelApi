import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBankAgentsByCustomersQuery } from './get-bank-agent-by-customers.query';
import { Inject } from '@nestjs/common';
import {
  BANK_AGENTS_REPOSITORY,
  BankAgentsRepository,
} from '../../domain/index-bank.agents-domain';

@QueryHandler(GetBankAgentsByCustomersQuery)
export class GetBankAgentsByCustomersHandler implements IQueryHandler<GetBankAgentsByCustomersQuery> {
  constructor(
    @Inject(BANK_AGENTS_REPOSITORY)
    private readonly _bankAgentsRepository: BankAgentsRepository,
  ) {}

  async execute() {
    const bankAgent =
      await this._bankAgentsRepository.getAgentBanksByCustomers();

    return bankAgent.map((item) => ({
      id: item.id,
      customerId: item.customerId,
      firstName: item.firstName,
      lastName: item.lastName,
      phone: item.phone,
      email: item.email,
      totalBankAgent: item.totalBankAgent,
      totalAmount: Number(item.totalAmount),
      firstBankAgentDate: item.firstBankAgentDate,
      lastBankAgentDate: item.lastBankAgentDate,
    }));
  }
}
