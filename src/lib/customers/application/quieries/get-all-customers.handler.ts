import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllCustomersQuery } from './get-all-customers.query';
import { CUSTOMERS_REPOSITORY } from '../../domain/respository/customers.repository.token';
import { CustomersRepository } from '../../domain/respository/customers.repository';
import { Inject } from '@nestjs/common';
import { CustomerMapper } from '../mappers/customers.mapper';

@QueryHandler(GetAllCustomersQuery)
export class GetAllCustomersHandler implements IQueryHandler<GetAllCustomersQuery> {
  constructor(
    @Inject(CUSTOMERS_REPOSITORY)
    private readonly _customersRepository: CustomersRepository,
  ) {}

  async execute() {
    const customers = await this._customersRepository.findAll();
    return customers.map((customers) =>
      CustomerMapper.toResponseDto(customers),
    );
  }
}
