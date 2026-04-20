import { BaseRepository } from 'src/shared/domain/base-repository';
import { AccountType } from '../entity/account-type.entity,';
import { AccountTypeId } from '../value-objects/account-typeId';

export type AccountTypeRepository = BaseRepository<AccountType, AccountTypeId>;
