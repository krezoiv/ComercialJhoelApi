import { randomUUID } from 'crypto';
import {
  AccountType,
  AccountTypeId,
  AccountTypeName,
} from '../../domain/index-account-type-domain';
import { createAccountTypeInput } from '../../infrastructure/types/create/create-account-input.type';

export class AccountTypeMapper {
  static toEntity(input: createAccountTypeInput): AccountType {
    const id = new AccountTypeId(randomUUID());
    const accountTypeName = new AccountTypeName(input.accountTypeName);
    const now = new Date();

    return new AccountType(id, accountTypeName, now, now, null);
  }

  static toResponseDto(accountType: AccountType) {
    return {
      id: accountType.id.value,
      accountTypeName: accountType.accountTypeName.value,
    };
  }
}
