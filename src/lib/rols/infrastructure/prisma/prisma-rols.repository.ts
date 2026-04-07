/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import {
  Description,
  Name,
  RolId,
  Rols,
  RolsRepository,
} from '../../domain/index-rols-domain';
import { CreateRolsSp, GetAllRolsSp } from '../index-rols-infrastructure';
import {
  ConflictError,
  DomainError,
  ValidationError,
} from 'src/shared/errors/index-errors';

@Injectable()
export class PrismaRolsRepository implements RolsRepository {
  constructor(
    private readonly _createRolsSp: CreateRolsSp,
    private readonly _getAllRosSp: GetAllRolsSp,
  ) {}

  async findAll(): Promise<Rols[]> {
    try {
      const data = await this._getAllRosSp.execute();

      return data.map(
        (item) =>
          new Rols(
            new RolId(item.id),
            new Name(item.name),
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findById(id: RolId): Promise<Rols | null> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(entity: Rols): Promise<Rols> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(id: RolId): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async create(rols: Rols): Promise<Rols> {
    try {
      const result = await this._createRolsSp.execute({
        name: rols.name.value,
        description: rols.description.value,
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
      return new Rols(
        new RolId(created.id),
        new Name(created.name),
        new Description(created.description),
        new Date(created.createdAt),
        new Date(created.updatedAt),
        created.deletedAt ? new Date(created.deletedAt) : null,
      );
    } catch (error) {
      console.error('Error creating rol:', error);

      if (
        error instanceof ValidationError ||
        error instanceof ConflictError ||
        error instanceof DomainError
      ) {
        throw error; // Re-throw known errors
      }

      throw new DomainError(
        'An unexpected error occurred while creating the rol',
      );
    }
  }
}
