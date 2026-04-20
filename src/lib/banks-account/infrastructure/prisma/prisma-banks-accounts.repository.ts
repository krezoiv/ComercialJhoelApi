import { Injectable } from '@nestjs/common';
import {
  BankAccountId,
  BankAccountName,
  BankAccountNumber,
  BanksAccounts,
  BanksAccountsRepository,
  FinalBalance,
  InitialBalance,
} from '../../domain/index-bank-account-domain';
import {
  CreateBanksAccountsSp,
  GetAllBanksAccounts,
  UpdateFinalBalanceSp,
} from '../index-banks-accounts-infrastructure';
import {
  ConflictError,
  DomainError,
  ValidationError,
} from 'src/shared/errors/index-errors';
import { BankId } from 'src/lib/banks/domain/index-banks-domain';
import { AccountTypeId } from 'src/lib/account-type/domain/index-account-type-domain';
import { GetAllBanksAccountsSp } from '../stored-procedures/get-all-banks-accounts.sp';
import { UpdateFinalBalanceResponse } from '../types/update/update-final-balance-response.interface';

@Injectable()
export class PrismaBanksAccountsRepository implements BanksAccountsRepository {
  constructor(
    private readonly _createBanksAccountsSp: CreateBanksAccountsSp,
    private readonly _getAllBanksAccountsSP: GetAllBanksAccountsSp,
    private readonly _updateFinalBalanceSP: UpdateFinalBalanceSp,
  ) {}

  getAllBanksAccounts(): Promise<GetAllBanksAccounts[]> {
    return this._getAllBanksAccountsSP.execute();
  }

  findAll(): Promise<BanksAccounts[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: BankAccountId): Promise<BanksAccounts | null> {
    throw new Error('Method not implemented.');
  }
  update(entity: BanksAccounts): Promise<BanksAccounts> {
    throw new Error('Method not implemented.');
  }
  delete(id: BankAccountId): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async create(bankAccount: BanksAccounts): Promise<BanksAccounts> {
    try {
      const result = await this._createBanksAccountsSp.execute({
        initialBalance: bankAccount.initialBalance.value,
        finalBalance: bankAccount.finalBalance.value,
        bankId: bankAccount.bankId.value,
        accountTypeId: bankAccount.accountTypeId.value,
        bankAccountNumber: bankAccount.bankAccountNumber.value,
        bankAccountName: bankAccount.bankAccountName.value,
      });

      const created = result[0];

      if (!created) {
        throw new DomainError('No response from database');
      }

      // 🔥 MAPEO DE ERRORES DESDE SP
      if (created.code !== 200) {
        switch (created.code) {
          case 400:
            throw new ValidationError(created.message);

          case 409:
            throw new ConflictError(created.message);

          default:
            throw new DomainError(created.message);
        }
      }

      return new BanksAccounts(
        new BankAccountId(created.id),
        new InitialBalance(Number(created.initialBalance)),
        new FinalBalance(Number(created.finalBalance)),
        new BankId(created.bankId),
        new AccountTypeId(created.accountTypeId),
        new BankAccountNumber(created.bankAccountNumber),
        new BankAccountName(created.bankAccountName),
        new Date(created.createdAt),
        new Date(created.updatedAt),
        created.deletedAt ? new Date(created.deletedAt) : null,
      );
    } catch (error) {
      console.error(error);

      // 👇 si ya es error de dominio, lo re-lanzas
      if (
        error instanceof ConflictError ||
        error instanceof ValidationError ||
        error instanceof DomainError
      ) {
        throw error;
      }

      // 👇 error inesperado
      throw new DomainError('Unexpected error creating person');
    }
  }

  async updateFinalBalance(entity: BanksAccounts): Promise<BanksAccounts> {
    try {
      const result = (await this._updateFinalBalanceSP.execute({
        updates: [
          {
            accountNumber: entity.bankAccountNumber.value,
            finalBalance: entity.finalBalance.value,
          },
        ],
      })) as { code: number; message: string }[];

      const updated = result[0];

      if (!updated) {
        throw new DomainError('No response from database');
      }

      if (updated.code !== 200) {
        switch (updated.code) {
          case 400:
            throw new ValidationError(updated.message);

          case 404:
            throw new DomainError(updated.message);

          default:
            throw new DomainError(updated.message);
        }
      }

      return entity;
    } catch (error) {
      console.error(error);

      if (
        error instanceof ValidationError ||
        error instanceof ConflictError ||
        error instanceof DomainError
      ) {
        throw error;
      }

      throw new DomainError('Unexpected error updating final balance');
    }
  }

  async findByAccountNumber(
    accountNumber: string,
  ): Promise<BanksAccounts | null> {
    try {
      const result = await this._getAllBanksAccountsSP.execute();

      const found = result.find((item) => item.accountNumber === accountNumber);

      if (!found) return null;

      return new BanksAccounts(
        new BankAccountId(found.id),
        new InitialBalance(Number(found.initialBalance)),
        new FinalBalance(Number(found.finalBalance)),
        new BankId(found.bankId),
        new AccountTypeId(found.accountTypeId),
        new BankAccountNumber(found.accountNumber),
        new BankAccountName(found.accountName),
        new Date(found.createdAt),
        new Date(found.updatedAt),
        found.deletedAt ? new Date(found.deletedAt) : null,
      );
    } catch (error) {
      console.error(error);
      throw new DomainError('Error finding bank account');
    }
  }

  async updateFinalBalanceMassive(
    updates: { accountNumber: string; finalBalance: number }[],
  ): Promise<UpdateFinalBalanceResponse> {
    try {
      const result = (await this._updateFinalBalanceSP.execute({
        updates,
      })) as UpdateFinalBalanceResponse[];

      const response = result[0];

      if (!response) {
        throw new DomainError('No response from database');
      }

      if (response.code !== 200) {
        switch (response.code) {
          case 400:
            throw new ValidationError(response.message);
          case 404:
            throw new DomainError(response.message);
          default:
            throw new DomainError(response.message);
        }
      }

      return response;
    } catch (error) {
      console.error(error);

      if (error instanceof ValidationError || error instanceof DomainError) {
        throw error;
      }

      throw new DomainError('Unexpected error updating balances');
    }
  }
}
