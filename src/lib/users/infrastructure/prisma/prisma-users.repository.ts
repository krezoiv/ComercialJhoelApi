import { Injectable } from '@nestjs/common';
import {
  PasswordHash,
  UserId,
  Username,
  Users,
  UsersRepository,
} from '../../index-users-domain';
import {
  CreateUsersSp,
  UsersWithRelations,
} from '../index-users-infrastructure';
import {
  ConflictError,
  DomainError,
  ValidationError,
} from 'src/shared/errors/index-errors';
import { PersonId } from 'src/lib/persons/domain/index-domain';
import { RolId } from 'src/lib/rols/domain/index-rols-domain';
import { UsersWithRelationsSp } from '../stored-procedures/users-with-relations.sp';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(
    private readonly _createUsersSp: CreateUsersSp,
    private readonly _usersWithRelationSp: UsersWithRelationsSp,
  ) {}
  async create(user: Users): Promise<Users> {
    try {
      const result = await this._createUsersSp.execute({
        rolId: user.rolId.value,
        personId: user.personId.value,
        userName: user.userName.value,
        passwordHash: user.passwordHash.value,
      });

      const created = result[0];
      if (!created) {
        throw new DomainError('No response from database');
      }

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

      return new Users(
        new UserId(created.id),
        new PersonId(created.personId),
        new RolId(created.rolId),
        new Username(created.userName),
        new PasswordHash(created.passwordHash),
        new Date(created.createdAt),
        new Date(created.updatedAt),
        created.deletedAt ? new Date(created.deletedAt) : null,
      );
    } catch (error) {
      console.error(error);

      if (
        error instanceof ConflictError ||
        error instanceof ValidationError ||
        error instanceof DomainError
      ) {
        throw error;
      }

      // 👇 error inesperado
      throw new DomainError('Unexpected error creating user');
    }
  }

  async findAllUsersWithRelation(): Promise<UsersWithRelations[]> {
    return this._usersWithRelationSp.execute();
  }

  findAll(): Promise<Users[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: UserId): Promise<Users | null> {
    throw new Error('Method not implemented.');
  }
  update(entity: Users): Promise<Users> {
    throw new Error('Method not implemented.');
  }
  delete(id: UserId): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
