import { BaseRepository } from 'src/shared/domain/base-repository';
import { Persons } from '../entity/persons.entity';
import { PersonId } from '../value-objects/personId';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PersonsRepository extends BaseRepository<Persons, PersonId> {}
