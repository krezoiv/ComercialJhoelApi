import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBanksAccountsCommand } from './create-banks-accounts.command';
import { Inject } from '@nestjs/common';
import {
  BANKS_ACCOUNTS_REPOSITORY,
  BanksAccountsRepository,
} from '../../domain/index-bank-account-domain';
import { BanksAccountsMapper } from '../index-banks-accounts-application';

@CommandHandler(CreateBanksAccountsCommand)
export class CreateBanksAccountsHandler implements ICommandHandler<CreateBanksAccountsCommand> {
  constructor(
    @Inject(BANKS_ACCOUNTS_REPOSITORY)
    private readonly _banksAccountsRepository: BanksAccountsRepository,
  ) {}

  async execute(command: CreateBanksAccountsCommand) {
    const bankAccount = BanksAccountsMapper.toEntity({
      initialBalance: command.initialBalance,
      finalBalance: command.finalBalance,
      bankId: command.bankId,
      accountTypeId: command.accountTypeId,
      bankAccountNumber: command.bankAccountNumber,
      bankAccountName: command.bankAccountName,
    });

    return this._banksAccountsRepository.create(bankAccount);
  }
}
