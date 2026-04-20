import { BaseRepository } from 'src/shared/domain/base-repository';
import { BankId, Banks } from '../index-banks-domain';

export type BanksRepository = BaseRepository<Banks, BankId>;
