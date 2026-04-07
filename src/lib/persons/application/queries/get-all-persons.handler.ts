import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllPersonsQuery } from './get-all-persons.query';
import { PersonsMapper } from '../index-application';
import {
  PERSONS_REPOSITORY,
  PersonsRepository,
} from '../../domain/index-domain';

@QueryHandler(GetAllPersonsQuery)
export class GetAllPersonsHandler implements IQueryHandler<GetAllPersonsQuery> {
  constructor(
    @Inject(PERSONS_REPOSITORY)
    private readonly _personsRepository: PersonsRepository,
  ) {}

  async execute() {
    const persons = await this._personsRepository.findAll();

    return persons.map((person) => PersonsMapper.toResponseDto(person));
  }
}
