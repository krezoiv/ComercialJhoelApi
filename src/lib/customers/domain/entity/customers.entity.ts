import { BaseEntity } from 'src/shared/domain/base-entity';
import { CustomerId } from '../value-objects/customerId';
import { PersonId } from 'src/lib/persons/domain/value-objects/personId';
import { Persons } from 'src/lib/persons/domain/entity/persons.entity';

export class Customers extends BaseEntity<CustomerId> {
  public personId: PersonId;
  public person?: Persons;

  constructor(
    id: CustomerId,
    personId: PersonId,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | null,
    person?: Persons,
  ) {
    super(id, createdAt, updatedAt, deletedAt);

    this.personId = personId;
    this.person = person;
  }
}
