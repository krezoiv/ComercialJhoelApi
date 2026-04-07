import { BaseAudit, SpResponse } from 'src/shared/infrastructure/base.type';
import { PersonBase } from './person-base.type';

export type CreatePersonInput = Omit<PersonBase, 'id'>;

export interface CreatePersonResult extends PersonBase, BaseAudit, SpResponse {}
