import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllBanksAccountsQuery } from './get-accounts-banks.query';
import { Inject } from '@nestjs/common';
import {
  BANKS_ACCOUNTS_REPOSITORY,
  BanksAccountsRepository,
} from '../../domain/index-bank-account-domain';

@QueryHandler(GetAllBanksAccountsQuery)
export class GetAllBanksAccountsHandler implements IQueryHandler<GetAllBanksAccountsQuery> {
  constructor(
    @Inject(BANKS_ACCOUNTS_REPOSITORY)
    private readonly _banksAccountsRepository: BanksAccountsRepository,
  ) {}

  async execute() {
    const bankAccount =
      await this._banksAccountsRepository.getAllBanksAccounts();

    return bankAccount.map((row) => ({
      id: row.id,
      initialBalance: row.initialBalance,
      finalBalance: row.finalBalance,
      bankAccountNumber: row.accountNumber,
      bankAccountName: row.accountName,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
      bankId: row.bankId,
      bankName: row.bankName,
      description: row.description,
      accountTypeId: row.accountTypeId,
      accountTypeName: row.accountTypeName,
    }));
  }
}
