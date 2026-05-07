import { BaseRepository } from 'src/shared/domain/base-repository';
import { BankAgent, BankAgentId } from '../index-bank.agents-domain';
import { IGetBankAgentsByCustomers } from '../../infrastructure/types/gets/get-bank-agents-by-customers.interface';
import { CustomerId } from 'src/lib/customers/domain/index-domain';
import {
  GetBankAgentsByCustomerIdResult,
  ProcessBankAgentsResult,
} from '../../infrastructure/index-agent-banks-infrastructure';

export interface BankAgentsRepository extends BaseRepository<
  BankAgent,
  BankAgentId
> {
  getAgentBanksByCustomers(): Promise<IGetBankAgentsByCustomers[]>;

  getAgentBanksByCustomersId(
    customerId: CustomerId,
  ): Promise<GetBankAgentsByCustomerIdResult[]>;

  processBankAgents(
    data: {
      id: string;
      amount: number;
      createdAt: string;
      checked: boolean;
    }[],
  ): Promise<ProcessBankAgentsResult>;
}
