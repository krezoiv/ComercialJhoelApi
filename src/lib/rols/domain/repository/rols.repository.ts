import { BaseRepository } from 'src/shared/domain/base-repository';
import { RolId, Rols } from '../index-rols-domain';

export type RolsRepository = BaseRepository<Rols, RolId>;
