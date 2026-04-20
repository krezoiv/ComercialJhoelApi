import { randomUUID } from 'crypto';
import {
  BankAccountId,
  BankAccountName,
  BankAccountNumber,
  BanksAccounts,
  FinalBalance,
  InitialBalance,
} from '../../domain/index-bank-account-domain';
import { CreateBanksAccountsInput } from '../../infrastructure/index-banks-accounts-infrastructure';
import { BankId } from 'src/lib/banks/domain/index-banks-domain';
import { AccountTypeId } from 'src/lib/account-type/domain/index-account-type-domain';

export class BanksAccountsMapper {
  static toEntity(input: CreateBanksAccountsInput): BanksAccounts {
    const id = new BankAccountId(randomUUID());
    const initialBalance = new InitialBalance(input.initialBalance);
    const finalBalance = new FinalBalance(input.finalBalance);
    const bankId = new BankId(input.bankId);
    const accountTypeId = new AccountTypeId(input.accountTypeId);
    const bankAccountNumber = new BankAccountNumber(input.bankAccountNumber);
    const bankAccountName = new BankAccountName(input.bankAccountName);
    const now = new Date();

    return new BanksAccounts(
      id,
      initialBalance,
      finalBalance,
      bankId,
      accountTypeId,
      bankAccountNumber,
      bankAccountName,
      now,
      now,
      null,
    );
  }

  static toResponseDto(bankAccount: BanksAccounts) {
    return {
      id: bankAccount.id.value,
      initialBalance: bankAccount.initialBalance.value,
      finalBalance: bankAccount.finalBalance.value,
      bankId: bankAccount.bankId.value,
      accountTypeId: bankAccount.accountTypeId.value,
      bankAccountNumber: bankAccount.bankAccountNumber.value,
      bankAccountName: bankAccount.bankAccountName.value,
      createdAt: bankAccount.createdAt,
      updatedAt: bankAccount.updatedAt,
    };
  }
}
