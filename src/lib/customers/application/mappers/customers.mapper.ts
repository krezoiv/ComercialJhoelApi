import { Customers } from '../../domain/entity/customers.entity';
import { CustomerId } from '../../domain/value-objects/customerId';
import { randomUUID } from 'crypto';
import { CreateCustomersInput } from '../../infrastructure/types/create-customers.type';

export class CustomerMapper {
  static toEntity(input: CreateCustomersInput): Customers {
    const id = new CustomerId(randomUUID());

    const personId = new CustomerId(input.personId);
    const now = new Date();

    return new Customers(id, personId, now, now, null);
  }

  static toResponseDto(customer: Customers) {
    return {
      id: customer.id.value,
      personId: customer.personId.value,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };
  }
}
