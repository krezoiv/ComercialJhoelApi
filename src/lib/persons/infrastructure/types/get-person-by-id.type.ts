import { BaseAudit, BaseId } from './base.type';
import { PersonBase } from './person.type';
import { SpResponse } from './sp-response.type';

export type GetPersonByIdInput = BaseId;

export interface GetPersonByIdResult
  extends PersonBase, BaseAudit, SpResponse {}
