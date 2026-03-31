import { BaseAudit, BaseId } from '../../../../shared/infrastructure/base.type';
import { PersonBase } from './person-base.type';
import { SpResponse } from '../../../../shared/infrastructure/sp-response.type';

export interface DeletePersonInput extends BaseId {
  deletedAt: string;
  updatedAt: string;
}

export interface DeletePersonResult extends PersonBase, BaseAudit, SpResponse {}
