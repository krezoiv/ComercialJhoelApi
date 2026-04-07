import { BaseEntity } from 'src/shared/domain/base-entity';
import {
  Email,
  FirstName,
  LastName,
  PersonId,
  PhoneNumber,
} from '../index-domain';

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
