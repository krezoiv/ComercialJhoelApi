import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchCustomersQuery } from './search-customers.query';
import {
  CUSTOMERS_REPOSITORY,
  CustomersRepository,
} from '../../domain/index-domain';
import { Inject } from '@nestjs/common';

@QueryHandler(SearchCustomersQuery)
export class SearchCustomersHanlder implements IQueryHandler<SearchCustomersQuery> {
  constructor(
    @Inject(CUSTOMERS_REPOSITORY)
    private readonly _customersRepository: CustomersRepository,
  ) {}

  async execute(query: SearchCustomersQuery) {
    const customers = await this._customersRepository.searchCustomers(
      query.search,
    );

    return customers.map((item) => ({
      id: item.id,
      personId: item.personId,
      firstName: item.firstName,
      lastName: item.lastName,
      phoneNumber: item.phoneNumber,
      email: item.email,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  }
}
