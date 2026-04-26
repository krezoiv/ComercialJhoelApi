import { BankAgentsBase } from '../bank-agents-base.interface';

export type CreateBankAgentsInput = Omit<BankAgentsBase, 'id'>;
