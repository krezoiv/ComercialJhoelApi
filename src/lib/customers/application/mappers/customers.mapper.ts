import { randomUUID } from 'crypto';
import { CreateCustomersInput } from '../../infrastructure/index-infrastructure';
import { CustomerId, Customers } from '../../domain/index-domain';
import { PersonId } from 'src/lib/persons/domain/index-domain';

export class CustomerMapper {
  static toEntity(input: CreateCustomersInput): Customers {
    const id = new CustomerId(randomUUID());

    const personId = new PersonId(input.personId);
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
