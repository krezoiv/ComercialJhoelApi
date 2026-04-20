import { BaseAudit, SpResponse } from 'src/shared/infrastructure/base.type';
import { BanksAccountsBase } from '../banks-accounts.base.interface';

export interface CreateBanksAccountsResults
  extends BanksAccountsBase, BaseAudit, SpResponse {}
