export interface GetAllBanksAccounts {
  id: string;
  initialBalance: number;
  finalBalance: number;
  accountNumber: string;
  accountName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  bankId: string;
  bankName: string;
  description: string;
  accountTypeId: string;
  accountTypeName: string;
}
