import { Injectable } from '@nestjs/common';
import { CustomersRepository } from '../../domain/respository/customers.repository';
import { Customers } from '../../domain/entity/customers.entity';
import { GetAllCustomersSp } from '../stored-procedures/get-all-customers.sp';
import { CustomerId } from '../../domain/value-objects/customerId';
import { PersonId } from 'src/lib/persons/domain/value-objects/personId';
import { CreateCustomersSp } from '../stored-procedures/create-customers.sp';
import { ValidationError } from 'src/shared/errors/validation-error';
import { ConflictError } from 'src/shared/errors/conflict-error';
import { DomainError } from 'src/shared/errors/domain-error';

@Injectable()
export class PrismaCustomersRepository implements CustomersRepository {
  constructor(
    private readonly _getAllCustomersSp: GetAllCustomersSp,
    private readonly _createCustomersSp: CreateCustomersSp,
  ) {}

  async create(customer: Customers): Promise<Customers> {
    try {
      const result = await this._createCustomersSp.execute({
        personId: customer.personId.value,
      });

      const created = result[0];

      if (!created) {
        throw new Error('No response from database');
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

      return new Customers(
        new CustomerId(created.id),
        new PersonId(created.personId),
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
      throw new DomainError('Unexpected error creating person');
    }
  }
  async findAll(): Promise<Customers[]> {
    try {
      const data = await this._getAllCustomersSp.execute();

      return data.map(
        (item) =>
          new Customers(
            new CustomerId(item.id),
            new PersonId(item.personId),
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
  findById(): Promise<Customers | null> {
    throw new Error('Method not implemented.');
  }
  update(): Promise<Customers> {
    throw new Error('Method not implemented.');
  }
  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
