import { BanksAccountsBase } from '../banks-accounts.base.interface';

export type CreateBanksAccountsInput = Omit<BanksAccountsBase, 'id'>;
