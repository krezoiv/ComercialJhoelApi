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
import {
  CreateBanksCommand,
  CreateBanksDto,
} from '../../application/index-banks-application';
import { Banks } from '../../domain/index-banks-domain';
import { GetAllBanksQuery } from '../../application/queries/get-all-banks.query';

@UseGuards(AuthGuard('jwt'), RolesGuard, PoliciesGuard)
@Controller('banks')
export class BanksController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @Post()
  @Rols(RolsList.ADMIN)
  @CheckPolicies((ability) => ability.can(Actions.Create, Subjects.Banks))
  async create(@Body() dto: CreateBanksDto): Promise<Banks> {
    return this._commandBus.execute(
      new CreateBanksCommand(dto.bankName, dto.description),
    );
  }

  @Get()
  @Rols(RolsList.ADMIN, RolsList.USER)
  @CheckPolicies((ability) => ability.can(Actions.Read, Subjects.Banks))
  async findAll(): Promise<Banks> {
    return this._queryBus.execute(new GetAllBanksQuery());
  }
}
