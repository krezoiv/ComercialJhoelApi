import { BaseAudit } from 'src/shared/infrastructure/base.type';
import { SpResponse } from 'src/shared/infrastructure/sp-response.type';
import { CustomersBase } from './customer-base.type';

export interface GetAllCustomerResults
  extends CustomersBase, BaseAudit, SpResponse {
  firstName: any;
  lastName: any;
  phoneNumber: any;
  email: any;
  total: any;
  id: string;
  personId: string;
}

export interface CustomerWithPerson {
  id: string;
  personId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  total: number;
}
