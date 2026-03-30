import { BaseAudit } from './base.type';
import { PersonBase } from './person.type';
import { SpResponse } from './sp-response.type';

export interface GetAllPersonResults
  extends PersonBase, BaseAudit, SpResponse {}
