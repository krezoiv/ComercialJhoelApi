import { BaseAudit, SpResponse } from 'src/shared/infrastructure/base.type';
import { BanksBase } from '../bank-base.type';

export interface CreateBanksResult extends BanksBase, BaseAudit, SpResponse {}
