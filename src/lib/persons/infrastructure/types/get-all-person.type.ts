import { BaseAudit } from '../../../../shared/infrastructure/base.type';
import { PersonBase } from './person-base.type';
import { SpResponse } from '../../../../shared/infrastructure/sp-response.type';

export interface GetAllPersonResults
  extends PersonBase, BaseAudit, SpResponse {}
