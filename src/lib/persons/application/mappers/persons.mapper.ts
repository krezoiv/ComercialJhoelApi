import { randomUUID } from 'crypto';
import { CreatePersonInput } from '../../infrastructure/index-infrastructure';
import {
  Email,
  FirstName,
  LastName,
  PersonId,
  Persons,
  PhoneNumber,
} from '../../domain/index-domain';

export class PersonsMapper {
  static toEntity(input: CreatePersonInput): Persons {
    const id = new PersonId(randomUUID());

    const firstName = new FirstName(input.firstName);
    const lastName = new LastName(input.lastName);
    const phoneNumber = new PhoneNumber(input.phoneNumber);
    const email = new Email(input.email);

    const now = new Date();

    return new Persons(
      id,
      firstName,
      lastName,
      phoneNumber,
      email,
      now,
      now,
      null,
    );
  }

  static toResponseDto(person: Persons) {
    return {
      id: person.id.value,
      firstName: person.firstName.value,
      lastName: person.lastName.value,
      phoneNumber: person.phoneNumber.value,
      email: person.email.value,
      createdAt: person.createdAt,
      updatedAt: person.updatedAt,
    };
  }
}
