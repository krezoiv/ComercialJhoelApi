import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateUsersCommand,
  CreateUsersDto,
  UsersWithRelationsQuery,
} from '../../application/index-users-application';
import { Users } from '../../index-users-domain';

@Controller('users')
export class UsersController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateUsersDto): Promise<Users> {
    return this._commandBus.execute(
      new CreateUsersCommand(
        dto.rolId,
        dto.personId,
        dto.userName,
        dto.password,
      ),
    );
  }

  @Get()
  async findUsersWithRelations(): Promise<Users> {
    return this._queryBus.execute(new UsersWithRelationsQuery());
  }
}
