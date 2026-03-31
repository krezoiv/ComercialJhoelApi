import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Customers } from '../../domain/entity/customers.entity';
import { GetAllCustomersQuery } from '../../application/quieries/get-all-customers.query';
import { CreateCustomersCommand } from '../../application/commands/create-customers.command';
import { CreateCustomersDto } from '../../application/dtos/create-customers.dto';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateCustomersDto): Promise<Customers> {
    return this._commandBus.execute(new CreateCustomersCommand(dto.personId));
  }

  @Get()
  async findAll(): Promise<Customers> {
    return this._queryBus.execute(new GetAllCustomersQuery());
  }
}
