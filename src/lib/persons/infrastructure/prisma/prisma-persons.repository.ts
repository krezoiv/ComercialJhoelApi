import { Injectable } from '@nestjs/common';
import {
  Email,
  FirstName,
  LastName,
  PersonId,
  Persons,
  PersonsRepository,
  PhoneNumber,
} from '../../domain/index-domain';
import {
  CreatePersonSp,
  DeletePesonSp,
  GetAllPersonSp,
  GetPersonByIdSp,
  UpdatePersonSp,
} from '../index-infrastructure';
import {
  ConflictError,
  DomainError,
  NotFoundError,
  ValidationError,
} from 'src/shared/errors/index-errors';

@Injectable()
export class PrismaPersonsRepository implements PersonsRepository {
  constructor(
    private readonly _getAllPersonSp: GetAllPersonSp,
    private readonly _createPersonSp: CreatePersonSp,
    private readonly _updatePersonSp: UpdatePersonSp,
    private readonly _getPersonByIdSp: GetPersonByIdSp,
    private readonly _deletePersonSp: DeletePesonSp,
  ) {}

  async create(person: Persons): Promise<Persons> {
    try {
      const result = await this._createPersonSp.execute({
        firstName: person.firstName.value,
        lastName: person.lastName.value,
        phoneNumber: person.phoneNumber.value,
        email: person.email.value,
        //id: '',
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

      return new Persons(
        new PersonId(created.id),
        new FirstName(created.firstName),
        new LastName(created.lastName),
        new PhoneNumber(created.phoneNumber),
        new Email(created.email),
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
  async findAll(): Promise<Persons[]> {
    try {
      const data = await this._getAllPersonSp.execute();

      return data.map(
        (item) =>
          new Persons(
            new PersonId(item.id),
            new FirstName(item.firstName),
            new LastName(item.lastName),
            new PhoneNumber(item.phoneNumber),
            new Email(item.email),
            new Date(item.createdAt),
            new Date(item.updatedAt),
            item.deletedAt ? new Date(item.deletedAt) : null,
          ),
      );
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching persons from SP');
    }
  }

  async findById(id: PersonId): Promise<Persons | null> {
    try {
      const result = await this._getPersonByIdSp.execute({
        id: id.value,
      });

      const person = result[0];

      // 🔥 NOT FOUND → null (no exception)
      if (!person || person.code === 404) {
        return null;
      }

      // 🔥 otros errores
      if (person.code !== 200) {
        throw new DomainError(person.message);
      }

      // 🔥 validación crítica
      if (!person.id) {
        throw new DomainError('SP did not return valid person');
      }

      return new Persons(
        new PersonId(person.id),
        new FirstName(person.firstName),
        new LastName(person.lastName),
        new PhoneNumber(person.phoneNumber),
        new Email(person.email),
        new Date(person.createdAt),
        new Date(person.updatedAt),
        person.deletedAt ? new Date(person.deletedAt) : null,
      );
    } catch (error) {
      console.error(error);

      if (error instanceof DomainError) {
        throw error;
      }

      throw new DomainError('Error fetching person');
    }
  }

  async update(person: Persons): Promise<Persons> {
    try {
      const result = await this._updatePersonSp.execute({
        id: person.id.value,
        firstName: person.firstName.value,
        lastName: person.lastName.value,
        phoneNumber: person.phoneNumber.value,
        email: person.email.value,
      });

      const updated = result[0];

      if (!updated) {
        throw new DomainError('No response from database');
      }

      // 🔥 MAPEO DE ERRORES
      if (updated.code !== 200) {
        switch (updated.code) {
          case 400:
            throw new ValidationError(updated.message);

          case 404:
            throw new NotFoundError('Person');

          case 409:
            throw new ConflictError(updated.message);

          default:
            throw new DomainError(updated.message);
        }
      }

      // 🔥 MAPEO A ENTITY
      return new Persons(
        new PersonId(updated.id),
        new FirstName(updated.firstName),
        new LastName(updated.lastName),
        new PhoneNumber(updated.phoneNumber),
        new Email(updated.email),
        new Date(updated.createdAt),
        new Date(updated.updatedAt),
        updated.deletedAt ? new Date(updated.deletedAt) : null,
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

      throw new DomainError('Error updating person');
    }
  }

  async delete(id: PersonId): Promise<void> {
    try {
      const result = await this._deletePersonSp.execute({
        id: id.value,
        deletedAt: '',
        updatedAt: '',
      });

      const deleted = result[0];

      if (!deleted) {
        throw new DomainError('No response from database');
      }

      if (deleted.code !== 200) {
        switch (deleted.code) {
          case 404:
            throw new NotFoundError('Person');

          default:
            throw new DomainError(deleted.message || 'Error deleting person');
        }
      }
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof DomainError) {
        throw error;
      }

      throw new DomainError('Error deleting person');
    }
  }
}
