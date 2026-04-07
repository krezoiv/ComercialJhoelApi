import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateCustomersCommand, CustomerMapper } from '../index-application';
import {
  CUSTOMERS_REPOSITORY,
  CustomersRepository,
} from '../../domain/index-domain';

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
