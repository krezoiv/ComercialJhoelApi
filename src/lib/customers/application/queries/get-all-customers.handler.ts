import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import {
  CUSTOMERS_REPOSITORY,
  CustomersRepository,
} from '../../domain/index-domain';
import { GetAllCustomersQuery } from './get-all-customers.query';

@QueryHandler(GetAllCustomersQuery)
export class GetAllCustomersHandler implements IQueryHandler<GetAllCustomersQuery> {
  constructor(
    @Inject(CUSTOMERS_REPOSITORY)
    private readonly _customersRepository: CustomersRepository,
  ) {}

  async execute() {
    const customers = await this._customersRepository.findAllRaw();

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
//
