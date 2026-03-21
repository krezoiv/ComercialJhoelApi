import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/database/prisma.service';

import { PersonsRepository } from '../../domain/repository/persons.repository';
import { Persons } from '../../domain/entity/persons.entity';

import { PersonId } from '../../domain/value-objects/personId';
import { FirstName } from '../../domain/value-objects/firstName';
import { LastName } from '../../domain/value-objects/lastName';
import { PhoneNumber } from '../../domain/value-objects/phoneNumber';
import { Email } from '../../domain/value-objects/email';

@Injectable()
export class PrismaPersonsRepository implements PersonsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(person: Persons): Promise<Persons> {
    await this.prisma.persons.create({
      data: {
        id: person.id.value,
        first_name: person.firstName.value,
        last_name: person.lastName.value,
        phone_number: person.phoneNumber.value,
        email: person.email.value,
        created_at: person.createdAt,
        updated_at: person.updatedAt,
        deleted_at: person.deletedAt,
      },
    });

    return person;
  }

  async findAll(): Promise<Persons[]> {
    const persons = await this.prisma.persons.findMany({
      where: {
        deleted_at: null,
      },
    });

    return persons.map(
      (p) =>
        new Persons(
          new PersonId(p.id),
          new FirstName(p.first_name),
          new LastName(p.last_name),
          new PhoneNumber(p.phone_number),
          new Email(p.email),
          p.created_at,
          p.updated_at,
          p.deleted_at,
        ),
    );
  }

  async findById(id: PersonId): Promise<Persons | null> {
    const person = await this.prisma.persons.findUnique({
      where: {
        id: id.value,
      },
    });

    if (!person) return null;

    return new Persons(
      new PersonId(person.id),
      new FirstName(person.first_name),
      new LastName(person.last_name),
      new PhoneNumber(person.phone_number),
      new Email(person.email),
      person.created_at,
      person.updated_at,
      person.deleted_at,
    );
  }

  async update(person: Persons): Promise<Persons> {
    await this.prisma.persons.update({
      where: {
        id: person.id.value,
      },
      data: {
        first_name: person.firstName.value,
        last_name: person.lastName.value,
        phone_number: person.phoneNumber.value,
        email: person.email.value,
        updated_at: person.updatedAt,
      },
    });

    return person;
  }

  async delete(id: PersonId): Promise<void> {
    await this.prisma.persons.update({
      where: {
        id: id.value,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
