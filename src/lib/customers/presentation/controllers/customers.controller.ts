import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateCustomersCommand,
  CreateCustomersDto,
  GetAllCustomersQuery,
} from '../../application/index-application';
import { Customers } from '../../domain/index-domain';

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
