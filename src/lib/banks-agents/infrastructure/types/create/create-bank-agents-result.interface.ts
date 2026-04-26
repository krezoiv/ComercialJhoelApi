import { BaseAudit, SpResponse } from 'src/shared/infrastructure/base.type';
import { BankAgentsBase } from '../bank-agents-base.interface';

export interface CreateBankgentsResult
  extends BankAgentsBase, BaseAudit, SpResponse {}
