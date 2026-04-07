import { BaseEntity } from 'src/shared/domain/index-shared-domin';
import { CustomerId } from '../index-domain';
import { PersonId, Persons } from 'src/lib/persons/domain/index-domain';

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
