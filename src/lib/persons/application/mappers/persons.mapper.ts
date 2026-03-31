import { randomUUID } from 'crypto';
import { Persons } from '../../domain/entity/persons.entity';
import { PersonId } from '../../domain/value-objects/personId';
import { FirstName } from '../../domain/value-objects/firstName';
import { LastName } from '../../domain/value-objects/lastName';
import { PhoneNumber } from '../../domain/value-objects/phoneNumber';
import { Email } from '../../domain/value-objects/email';
import { CreatePersonInput } from '../../infrastructure/types/create-person.type';

// type CreatePersonInput = {
//   firstName: string;
//   lastName: string;
//   phoneNumber: string;
//   email: string;
// };
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

  // 🔥 ESTE ESTÁ PERFECTO
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
