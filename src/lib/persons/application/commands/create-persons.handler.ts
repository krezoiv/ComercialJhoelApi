import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreatePersonsCommand, PersonsMapper } from '../index-application';
import {
  PERSONS_REPOSITORY,
  PersonsRepository,
} from '../../domain/index-domain';

@CommandHandler(CreatePersonsCommand)
export class CreatePersonsHandler implements ICommandHandler<CreatePersonsCommand> {
  constructor(
    @Inject(PERSONS_REPOSITORY)
    private readonly _personRepository: PersonsRepository,
  ) {}

  async execute(command: CreatePersonsCommand) {
    const person = PersonsMapper.toEntity({
      firstName: command.firstName,
      lastName: command.lastName,
      phoneNumber: command.phoneNumber,
      email: command.email,
    });

    return this._personRepository.create(person);
  }
}
