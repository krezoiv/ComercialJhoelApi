import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { CreatePersonsCommand } from './create-persons.command';
import { PersonsMapper } from '../mappers/persons.mapper';
import { PersonsRepository } from '../../domain/repository/persons.repository';
import { PERSONS_REPOSITORY } from '../../domain/repository/persons.repository.token';

@CommandHandler(CreatePersonsCommand)
export class CreatePersonsHandler implements ICommandHandler<CreatePersonsCommand> {
  constructor(
    @Inject(PERSONS_REPOSITORY)
    private readonly personRepository: PersonsRepository,
  ) {}

  async execute(command: CreatePersonsCommand) {
    const person = PersonsMapper.toEntity({
      firstName: command.firstName,
      lastName: command.lastName,
      phoneNumber: command.phoneNumber,
      email: command.email,
    });

    return this.personRepository.create(person);
  }
}
