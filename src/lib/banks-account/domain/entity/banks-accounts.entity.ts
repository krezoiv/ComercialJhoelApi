import { BaseEntity } from 'src/shared/domain/base-entity';
import { BankAccountId } from '../value-objects/bank-accountId';
import {
  AccountTypeId,
  AccountType,
} from 'src/lib/account-type/domain/index-account-type-domain';
import { Banks, BankId } from 'src/lib/banks/domain/index-banks-domain';
import {
  InitialBalance,
  FinalBalance,
  BankAccountNumber,
  BankAccountName,
} from '../index-bank-account-domain';

export class BanksAccounts extends BaseEntity<BankAccountId> {
  public initialBalance: InitialBalance;
  public finalBalance: FinalBalance;
  public bankId: BankAccountId;
  public accountTypeId: AccountTypeId;
  public bankAccountNumber: BankAccountNumber;
  public bankAccountName: BankAccountName;
  public banks?: Banks;
  public accountType?: AccountType;

  constructor(
    id: BankAccountId,
    initialBalance: InitialBalance,
    finalBalance: FinalBalance,
    bankId: BankId,
    accountTypeId: AccountTypeId,
    accountNumber: BankAccountNumber,
    bankAccountName: BankAccountName,
    createdAt: Date,
    updateAt: Date,
    deletedAt?: Date | null,
  ) {
    super(id, createdAt, updateAt, deletedAt);
    this.initialBalance = initialBalance;
    this.finalBalance = finalBalance;
    this.bankId = bankId;
    this.accountTypeId = accountTypeId;
    this.bankAccountNumber = accountNumber;
    this.bankAccountName = bankAccountName;
  }
  updateFinalBalance(value: FinalBalance) {
    this.finalBalance = value;
    this.updatedAt = new Date();
  }
}
