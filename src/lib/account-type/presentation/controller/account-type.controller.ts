import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import {
  Actions,
  CheckPolicies,
  PoliciesGuard,
  RolesGuard,
  Rols,
  RolsList,
  Subjects,
} from 'src/shared/auth/index-shared -auth';
import { CreateAccountTypeDto } from '../../application/dtos/create.account-type.dto';
import { AccountType } from '../../domain/index-account-type-domain';
import { CreateAccountTypeCommand } from '../../application/commands/create-account-type.command';
import { GetAllAccountTypeQuery } from '../../application/queries/get-all-account-types.query';

@UseGuards(AuthGuard('jwt'), RolesGuard, PoliciesGuard)
@Controller('account-type')
export class AccountTypeController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @Post()
  @Rols(RolsList.ADMIN)
  @CheckPolicies((ability) => ability.can(Actions.Create, Subjects.AccountType))
  async create(@Body() dto: CreateAccountTypeDto): Promise<AccountType> {
    return this._commandBus.execute(
      new CreateAccountTypeCommand(dto.accountTypeName),
    );
  }

  @Get()
  @Rols(RolsList.ADMIN)
  @CheckPolicies((ability) => ability.can(Actions.Read, Subjects.AccountType))
  async findAll(): Promise<AccountType> {
    return this._queryBus.execute(new GetAllAccountTypeQuery());
  }
}
