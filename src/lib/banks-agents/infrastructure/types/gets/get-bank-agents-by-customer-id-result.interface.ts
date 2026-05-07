import { BaseAudit, SpResponse } from 'src/shared/infrastructure/base.type';
import { BankAgentsBase } from '../bank-agents-base.interface';

export interface GetBankAgentsByCustomerIdResult
  extends BankAgentsBase, BaseAudit, SpResponse {
  bankName: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  userName: string;
}
