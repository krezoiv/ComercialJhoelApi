import { Injectable } from '@nestjs/common';
import {
  AccountType,
  AccountTypeId,
  AccountTypeName,
  AccountTypeRepository,
} from '../../domain/index-account-type-domain';
import { CreateAccountTypeSp } from '../stored-procedure/create-account-type.sp';
import { DomainError } from 'src/shared/errors/domain-error';
import { ValidationError } from 'src/shared/errors/validation-error';
import { ConflictError } from 'src/shared/errors/conflict-error';
import { GetAllAccountTypeSp } from '../stored-procedure/get-all-account-type.sp';

@Injectable()
export class PrismaAccountTypeRepository implements AccountTypeRepository {
  constructor(
    private readonly _createAccountTypeSp: CreateAccountTypeSp,
    private readonly _getAllAccountTypeSp: GetAllAccountTypeSp,
  ) {}

  async findAll(): Promise<AccountType[]> {
    try {
      const data = await this._getAllAccountTypeSp.execute();

      return data.map(
        (item) =>
          new AccountType(
            new AccountTypeId(item.id),
            new AccountTypeName(item.accountTypeName),
            new Date(item.createdAt),
            new Date(item.updatedAt),
            item.deletedAt ? new Date(item.deletedAt) : null,
          ),
      );
    } catch (error) {
      console.log(error);
      throw new Error('Error fetching rols from SP');
    }
  }

  findById(id: AccountTypeId): Promise<AccountType | null> {
    throw new Error('Method not implemented.');
  }
  update(entity: AccountType): Promise<AccountType> {
    throw new Error('Method not implemented.');
  }
  delete(id: AccountTypeId): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async create(accountType: AccountType): Promise<AccountType> {
    try {
      const result = await this._createAccountTypeSp.execute({
        accountTypeName: accountType.accountTypeName.value,
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

      return new AccountType(
        new AccountTypeId(created.id),
        new AccountTypeName(created.accountTypeName),
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
      throw new DomainError('Unexpected error creating banks');
    }
  }
}
