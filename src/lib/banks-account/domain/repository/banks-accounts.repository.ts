import { BaseRepository } from 'src/shared/domain/base-repository';
import { BankAccountId, BanksAccounts } from '../index-bank-account-domain';
import { GetAllBanksAccounts } from '../../infrastructure/index-banks-accounts-infrastructure';
import { UpdateFinalBalanceResponse } from '../../infrastructure/types/update/update-final-balance-response.interface';

export interface BanksAccountsRepository extends BaseRepository<
  BanksAccounts,
  BankAccountId
> {
  getAllBanksAccounts(): Promise<GetAllBanksAccounts[]>;
  findByAccountNumber(accountNumber: string): Promise<BanksAccounts | null>;
  updateFinalBalance(entity: BanksAccounts): Promise<BanksAccounts>;
  updateFinalBalanceMassive(
    updates: { accountNumber: string; finalBalance: number }[],
  ): Promise<UpdateFinalBalanceResponse>;
}
