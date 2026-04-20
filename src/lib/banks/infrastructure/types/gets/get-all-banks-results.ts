import { BaseAudit, SpResponse } from 'src/shared/infrastructure/base.type';
import { BanksBase } from '../bank-base.type';

export interface GetAllBanksResults extends BanksBase, BaseAudit, SpResponse {}
