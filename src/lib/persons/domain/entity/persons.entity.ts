import { BaseEntity } from 'src/shared/domain/base-entity';
import { Email } from '../value-objects/email';
import { FirstName } from '../value-objects/firstName';
import { LastName } from '../value-objects/lastName';
import { PersonId } from '../value-objects/personId';
import { PhoneNumber } from '../value-objects/phoneNumber';

export class Persons extends BaseEntity<PersonId> {
  public firstName: FirstName;
  public lastName: LastName;
  public phoneNumber: PhoneNumber;
  public email: Email;

  constructor(
    id: PersonId,
    firstName: FirstName,
    lastName: LastName,
    phoneNumber: PhoneNumber,
    email: Email,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);

    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }
}
