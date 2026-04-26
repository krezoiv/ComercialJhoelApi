import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateCustomersCommand,
  CreateCustomersDto,
  GetAllCustomersQuery,
} from '../../application/index-application';
import { Customers } from '../../domain/index-domain';
import { SearchCustomersQuery } from '../../application/queries/search-customers.query';
import { CustomerWithPerson } from '../../infrastructure/index-infrastructure';

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

  @Get('search')
  async searchCustomers(
    @Query('search') search: string,
  ): Promise<CustomerWithPerson[]> {
    return this._queryBus.execute<SearchCustomersQuery, CustomerWithPerson[]>(
      new SearchCustomersQuery(search),
    );
  }
}
