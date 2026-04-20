import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
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
  CreateBanksAccountsCommand,
  CreateBanksAccountsDto,
  GetAllBanksAccountsQuery,
  UpdateFinalBalanceItemDto,
} from '../../application/index-banks-accounts-application';
import { BanksAccounts } from '../../domain/index-bank-account-domain';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateFinalBalanceCommand } from '../../application/commands/update-final-balance.command';
import { UpdateFinalBalanceResponse } from '../../infrastructure/types/update/update-final-balance-response.interface';

@UseGuards(AuthGuard('jwt'), RolesGuard, PoliciesGuard)
@Controller('banks-accounts')
export class BanksAccountsController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @Post()
  @Rols(RolsList.ADMIN)
  @CheckPolicies((ability) =>
    ability.can(Actions.Create, Subjects.BanksAccounts),
  )
  async create(@Body() dto: CreateBanksAccountsDto): Promise<BanksAccounts> {
    return this._commandBus.execute(
      new CreateBanksAccountsCommand(
        dto.initialBalance,
        dto.finalBalance,
        dto.bankId,
        dto.accountTypeId,
        dto.bankAccountNumber,
        dto.bankAccountName,
      ),
    );
  }

  @Get()
  async getAllBanksAccounts(): Promise<BanksAccounts[]> {
    return this._queryBus.execute(new GetAllBanksAccountsQuery());
  }

  @Patch('/final-balance')
  async updateFinalBalance(
    @Body() dto: UpdateFinalBalanceItemDto[],
  ): Promise<UpdateFinalBalanceResponse> {
    return this._commandBus.execute<
      UpdateFinalBalanceCommand,
      UpdateFinalBalanceResponse
    >(new UpdateFinalBalanceCommand(dto));
  }
}
