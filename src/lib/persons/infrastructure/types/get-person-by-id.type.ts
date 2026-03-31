import { BaseAudit, BaseId } from '../../../../shared/infrastructure/base.type';
import { PersonBase } from './person-base.type';
import { SpResponse } from '../../../../shared/infrastructure/sp-response.type';

export type GetPersonByIdInput = BaseId;

export interface GetPersonByIdResult
  extends PersonBase, BaseAudit, SpResponse {}
