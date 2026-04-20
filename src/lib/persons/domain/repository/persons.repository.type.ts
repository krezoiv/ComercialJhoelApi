import { BaseRepository } from 'src/shared/domain/index-shared-domin';
import { PersonId, Persons } from '../index-domain';

export type PersonsRepository = BaseRepository<Persons, PersonId>;
