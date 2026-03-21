import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { UpdatePersonsCommand } from '../commands/update-persons.command';

import { PERSONS_REPOSITORY } from '../../domain/repository/persons.repository.token';
import { PersonsRepository } from '../../domain/repository/persons.repository';
import { NotFoundError } from 'src/shared/errors/not-found-error';

import { PersonId } from '../../domain/value-objects/personId';
import { FirstName } from '../../domain/value-objects/firstName';
import { LastName } from '../../domain/value-objects/lastName';
import { PhoneNumber } from '../../domain/value-objects/phoneNumber';
import { Email } from '../../domain/value-objects/email';

@CommandHandler(UpdatePersonsCommand)
export class UpdatePersonsHandler implements ICommandHandler<UpdatePersonsCommand> {
  constructor(
    @Inject(PERSONS_REPOSITORY)
    private readonly personsRepository: PersonsRepository,
  ) {}

  async execute(command: UpdatePersonsCommand) {
    const personId = new PersonId(command.id);

    const person = await this.personsRepository.findById(personId);

    if (!person) {
      throw new NotFoundError('Person');
    }

    if (command.firstName) {
      person.firstName = new FirstName(command.firstName);
    }

    if (command.lastName) {
      person.lastName = new LastName(command.lastName);
    }

    if (command.phoneNumber) {
      person.phoneNumber = new PhoneNumber(command.phoneNumber);
    }

    if (command.email) {
      person.email = new Email(command.email);
    }

    return this.personsRepository.update(person);
  }
}
