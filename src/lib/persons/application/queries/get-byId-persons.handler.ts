import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
//import { NotFoundError } from 'src/shared/errors/not-found-error';
import { GetByIdPersonsQuery } from './get-byId-persons.query';
import {
  PersonId,
  PERSONS_REPOSITORY,
  PersonsRepository,
} from '../../domain/index-domain';
import { NotFoundError } from 'src/shared/errors/index-errors';
import { PersonsMapper } from '../index-application';

@QueryHandler(GetByIdPersonsQuery)
export class GetPersonByIdHandler implements IQueryHandler<GetByIdPersonsQuery> {
  constructor(
    @Inject(PERSONS_REPOSITORY)
    private readonly personsRepository: PersonsRepository,
  ) {}

  async execute(query: GetByIdPersonsQuery) {
    const personId = new PersonId(query.id);

    const person = await this.personsRepository.findById(personId);

    if (!person) {
      throw new NotFoundError('Person');
    }

    return PersonsMapper.toResponseDto(person);
  }
}
