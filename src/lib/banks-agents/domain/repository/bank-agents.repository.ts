import { BaseRepository } from 'src/shared/domain/base-repository';
import { BankAgent, BankAgentId } from '../index-bank.agents-domain';
import { IGetBankAgentsByCustomers } from '../../infrastructure/types/gets/get-bank-agents-by-customers.interface';

export interface BankAgentsRepository extends BaseRepository<
  BankAgent,
  BankAgentId
> {
  getAgentBanksByCustomers(): Promise<IGetBankAgentsByCustomers[]>;
}
