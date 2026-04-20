import { BaseId } from 'src/shared/infrastructure/base.type';

export interface UpdateBanksAccountsInput extends BaseId {
  initialBalance?: number;
  finalBalance?: number;
  bankId?: string;
  accountTypeId?: string;
  bankAccountNumber?: string;
  bankAccountName?: string;
}
