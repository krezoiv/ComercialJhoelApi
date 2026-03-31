import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCustomersCommand } from './create-customers.command';
import { Inject } from '@nestjs/common';
import { CUSTOMERS_REPOSITORY } from '../../domain/respository/customers.repository.token';
import { CustomersRepository } from '../../domain/respository/customers.repository';
import { CustomerMapper } from '../mappers/customers.mapper';

@CommandHandler(CreateCustomersCommand)
export class CreateCustomersHandler implements ICommandHandler<CreateCustomersCommand> {
  constructor(
    @Inject(CUSTOMERS_REPOSITORY)
    private readonly _customersRepository: CustomersRepository,
  ) {}

  async execute(command: CreateCustomersCommand) {
    const customer = CustomerMapper.toEntity({
      personId: command.persdonId,
    });

    return this._customersRepository.create(customer);
  }
}
