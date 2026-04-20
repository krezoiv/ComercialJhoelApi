import { BaseEntity } from 'src/shared/domain/base-entity';
import { AccountTypeId, AccountTypeName } from '../index-account-type-domain';

export class AccountType extends BaseEntity<AccountTypeId> {
  public accountTypeName: AccountTypeName;

  constructor(
    id: AccountTypeId,
    accountTypeName: AccountTypeName,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this.accountTypeName = accountTypeName;
  }
}
