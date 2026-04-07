import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateRolsCommand,
  CreateRolsDto,
  GetAllRolsQuery,
} from '../../application/index-rols-application';
import { Rols } from '../../domain/index-rols-domain';

@Controller('rols')
export class RolsController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateRolsDto): Promise<Rols> {
    return this._commandBus.execute(
      new CreateRolsCommand(dto.name, dto.description),
    );
  }

  @Get()
  async findAll(): Promise<Rols> {
    return this._queryBus.execute(new GetAllRolsQuery());
  }
}
