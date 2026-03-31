import { BaseAudit } from 'src/shared/infrastructure/base.type';
import { CustomersBase } from './customer-base.type';
import { SpResponse } from 'src/shared/infrastructure/sp-response.type';

export { CustomersBase } from './customer-base.type';

export type CreateCustomersInput = Omit<CustomersBase, 'id'>;

export interface CreateCustomersResult
  extends CustomersBase, BaseAudit, SpResponse {}
