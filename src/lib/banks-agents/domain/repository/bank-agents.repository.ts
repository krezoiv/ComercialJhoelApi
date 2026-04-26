import { BaseRepository } from 'src/shared/domain/base-repository';
import { BankAgent, BankAgentId } from '../index-bank.agents-domain';

export type BankAgentsRepository = BaseRepository<BankAgent, BankAgentId>;
