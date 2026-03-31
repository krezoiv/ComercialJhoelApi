import { BaseRepository } from 'src/shared/domain/base-repository';
import { Customers } from '../entity/customers.entity';
import { CustomerId } from '../value-objects/customerId';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CustomersRepository extends BaseRepository<
  Customers,
  CustomerId
> {}
