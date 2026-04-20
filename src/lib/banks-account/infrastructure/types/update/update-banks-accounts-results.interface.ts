export interface UpdateBanksAccountsResults {
  code: number;
  message: string;
  initialBalance: number;
  finalBalance: number;
  bankId: string;
  accountTypeId: string;
  bankAccountNumber: string;
  bankAccountName: string;
}
