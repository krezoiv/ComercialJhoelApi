import { BaseAudit, BaseId } from './base.type';
import { PersonBase } from './person.type';
import { SpResponse } from './sp-response.type';

export interface DeletePersonInput extends BaseId {
  deletedAt: string;
  updatedAt: string;
}

export interface DeletePersonResult extends PersonBase, BaseAudit, SpResponse {}
