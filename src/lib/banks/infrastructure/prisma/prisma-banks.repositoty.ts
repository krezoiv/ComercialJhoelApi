import { Injectable } from '@nestjs/common';
import {
  BankId,
  BankName,
  Banks,
  BanksRepository,
  Description,
} from '../../domain/index-banks-domain';

import { DomainError } from 'src/shared/errors/domain-error';
import { ValidationError } from 'src/shared/errors/validation-error';
import { ConflictError } from 'src/shared/errors/conflict-error';
import { CreateBanksSp } from '../index-banks-infrastructure';
import { GetAllBanksSp } from '../stored-procedures/get-all-banks.sp';

@Injectable()
export class PrismaBanksRepository implements BanksRepository {
  constructor(
    private readonly _createBanksSp: CreateBanksSp,
    private readonly _getAllBanksSp: GetAllBanksSp,
  ) {}

  async create(bank: Banks): Promise<Banks> {
    try {
      const result = await this._createBanksSp.execute({
        bankName: bank.bankName.value,
        description: bank.description.value,
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

      return new Banks(
        new BankId(created.id),
        new BankName(created.bankName),
        new Description(created.description),
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

  async findAll(): Promise<Banks[]> {
    try {
      const data = await this._getAllBanksSp.execute();

      return data.map(
        (item) =>
          new Banks(
            new BankId(item.id),
            new BankName(item.bankName),
            new Description(item.description),
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

  findById(id: BankId): Promise<Banks | null> {
    throw new Error('Method not implemented.');
  }
  update(entity: Banks): Promise<Banks> {
    throw new Error('Method not implemented.');
  }
  delete(id: BankId): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
