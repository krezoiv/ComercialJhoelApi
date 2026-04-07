import { BaseRepository } from 'src/shared/domain/index-shared-domin';
import { CustomerId, Customers } from '../index-domain';
import { CustomerWithPerson } from '../../infrastructure/index-infrastructure';

export interface CustomersRepository extends BaseRepository<
  Customers,
  CustomerId
> {
  findAllRaw(): Promise<CustomerWithPerson[]>;
}
