import { BaseRepository } from 'src/shared/domain/index-shared-domin';
import { CustomerId, Customers } from '../index-domain';
import { CustomerWithPerson } from '../../infrastructure/index-infrastructure';
import { IGetCustomerStats } from '../../infrastructure/types/get-customer.stats-interface';

export interface CustomersRepository extends BaseRepository<
  Customers,
  CustomerId
> {
  findAllRaw(): Promise<CustomerWithPerson[]>;
  searchCustomers(search: string): Promise<CustomerWithPerson[]>;
  getCustomerStats(): Promise<IGetCustomerStats[]>;
}
