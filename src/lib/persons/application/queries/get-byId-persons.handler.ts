import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundError } from 'src/shared/errors/not-found-error';
import { GetByIdPersonsQuery } from './get-byId-persons.query';

import { PersonId } from '../../domain/value-objects/personId';

import { PERSONS_REPOSITORY } from '../../domain/repository/persons.repository.token';
import { PersonsRepository } from '../../domain/repository/persons.repository';
import { PersonsMapper } from '../mappers/persons.mapper';

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
