import { randomUUID } from 'crypto';

import { Persons } from '../../domain/entity/persons.entity';
import { CreatePersonDto } from '../dtos/create-persons.dto';

import { PersonId } from '../../domain/value-objects/personId';
import { FirstName } from '../../domain/value-objects/firstName';
import { LastName } from '../../domain/value-objects/lastName';
import { PhoneNumber } from '../../domain/value-objects/phoneNumber';
import { Email } from '../../domain/value-objects/email';

export class PersonsMapper {
  static toEntity(dto: CreatePersonDto): Persons {
    const id = new PersonId(randomUUID());

    const firstName = new FirstName(dto.firstName);
    const lastName = new LastName(dto.lastName);
    const phoneNumber = new PhoneNumber(dto.phoneNumber);
    const email = new Email(dto.email);

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
