import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBankAgentByCustormerIdQuery } from './get-bank-agent-by-customer-id.query';
import { Inject } from '@nestjs/common';
import {
  BANK_AGENTS_REPOSITORY,
  BankAgentsRepository,
} from '../../domain/index-bank.agents-domain';
import { CustomerId } from 'src/lib/customers/domain/index-domain';
import { NotFoundError } from 'src/shared/errors/not-found-error';
import { BankAgentsMapper } from '../index-banks-agents-application';
import { IBankAgentCustomersIdResponseDto } from '../dtos/bank-agent-customersId.response.dto';

@QueryHandler(GetBankAgentByCustormerIdQuery)
export class GetBankAgentsByCustomersIdHandler implements IQueryHandler<GetBankAgentByCustormerIdQuery> {
  constructor(
    @Inject(BANK_AGENTS_REPOSITORY)
    private readonly _bankAgentsRepository: BankAgentsRepository,
  ) {}

  async execute(
    query: GetBankAgentByCustormerIdQuery,
  ): Promise<IBankAgentCustomersIdResponseDto[]> {
    const customerId = new CustomerId(query.id);
    const bankAgents =
      await this._bankAgentsRepository.getAgentBanksByCustomersId(customerId);

    if (!bankAgents) {
      throw new NotFoundError('bankAgents');
    }

    return BankAgentsMapper.toResponseList(bankAgents);
  }
}
