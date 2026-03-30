import { BaseAudit, SpResponse } from './base.type';
import { PersonBase } from './person.type';

export type CreatePersonInput = Omit<PersonBase, 'id'>;

export interface CreatePersonResult extends PersonBase, BaseAudit, SpResponse {}
