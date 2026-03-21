import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundError } from 'src/shared/errors/not-found-error';
import { Inject } from '@nestjs/common';

import { SoftDeletePersonsCommand } from '../commands/soft-delete-persons.command';

import { PERSONS_REPOSITORY } from '../../domain/repository/persons.repository.token';
import { PersonsRepository } from '../../domain/repository/persons.repository';

import { PersonId } from '../../domain/value-objects/personId';
@CommandHandler(SoftDeletePersonsCommand)
export class SoftDeletePersonsHandler implements ICommandHandler<SoftDeletePersonsCommand> {
  constructor(
    @Inject(PERSONS_REPOSITORY)
    private readonly personsRepository: PersonsRepository,
  ) {}

  async execute(command: SoftDeletePersonsCommand) {
    const personId = new PersonId(command.id);

    const person = await this.personsRepository.findById(personId);

    if (!person) {
      throw new NotFoundError('Person');
    }

    return this.personsRepository.delete(personId);
  }
}
