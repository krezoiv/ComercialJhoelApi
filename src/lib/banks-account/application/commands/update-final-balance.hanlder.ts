import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  BANKS_ACCOUNTS_REPOSITORY,
  BanksAccountsRepository,
} from '../../domain/index-bank-account-domain';
import { Inject } from '@nestjs/common';
import { UpdateFinalBalanceResponse } from '../../infrastructure/types/update/update-final-balance-response.interface';
import { UpdateFinalBalanceCommand } from './update-final-balance.command';

@CommandHandler(UpdateFinalBalanceCommand)
export class UpdateFinalBalanceHandler implements ICommandHandler<
  UpdateFinalBalanceCommand,
  UpdateFinalBalanceResponse
> {
  constructor(
    @Inject(BANKS_ACCOUNTS_REPOSITORY)
    private readonly banksAccountsRepository: BanksAccountsRepository,
  ) {}

  async execute(
    command: UpdateFinalBalanceCommand,
  ): Promise<UpdateFinalBalanceResponse> {
    return this.banksAccountsRepository.updateFinalBalanceMassive(
      command.updates,
    );
  }
}
