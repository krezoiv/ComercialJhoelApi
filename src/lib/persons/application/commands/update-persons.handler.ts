import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdatePersonsCommand } from '../index-application';
import {
  Email,
  FirstName,
  LastName,
  PersonId,
  PERSONS_REPOSITORY,
  PersonsRepository,
  PhoneNumber,
} from '../../domain/index-domain';
import { NotFoundError } from 'src/shared/errors/index-errors';

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
