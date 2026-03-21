import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { GetAllPersonsQuery } from './get-all-persons.query';
import { PersonsMapper } from '../mappers/persons.mapper';

import { PersonsRepository } from '../../domain/repository/persons.repository';
import { PERSONS_REPOSITORY } from '../../domain/repository/persons.repository.token';

@QueryHandler(GetAllPersonsQuery)
export class GetAllPersonsHandler implements IQueryHandler<GetAllPersonsQuery> {
  constructor(
    @Inject(PERSONS_REPOSITORY)
    private readonly personsRepository: PersonsRepository,
  ) {}

  async execute() {
    const persons = await this.personsRepository.findAll();

    return persons.map((person) => PersonsMapper.toResponseDto(person));
  }
}
