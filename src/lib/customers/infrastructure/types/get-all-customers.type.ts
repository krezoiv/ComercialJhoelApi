import { BaseAudit } from 'src/shared/infrastructure/base.type';
import { SpResponse } from 'src/shared/infrastructure/sp-response.type';
import { CustomersBase } from './customer-base.type';

export interface GetAllCustomerResults
  extends CustomersBase, BaseAudit, SpResponse {
  id: string;
  personId: string;
}
