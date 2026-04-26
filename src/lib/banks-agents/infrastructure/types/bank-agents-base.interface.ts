import { BaseId } from 'src/shared/infrastructure/base.type';

export interface BankAgentsBase extends BaseId {
  userId: string;
  customerId: string;
  bankId: string;
  agentDescription: string;
  bankAgentAmount: number;
  paymentDate: Date;
}
