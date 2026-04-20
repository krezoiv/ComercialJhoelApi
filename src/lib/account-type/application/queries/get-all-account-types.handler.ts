import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllAccountTypeQuery } from './get-all-account-types.query';
import { Inject } from '@nestjs/common';
import {
  ACCOUNT_TYPE_REPOSITORY,
  AccountTypeRepository,
} from '../../domain/index-account-type-domain';
import { AccountTypeMapper } from '../mappers/account-type.mapper';

@QueryHandler(GetAllAccountTypeQuery)
export class GetAllAccountTypeHandler implements IQueryHandler<GetAllAccountTypeQuery> {
  constructor(
    @Inject(ACCOUNT_TYPE_REPOSITORY)
    private readonly _accountTypeRepository: AccountTypeRepository,
  ) {}

  async execute() {
    const accountType = await this._accountTypeRepository.findAll();
    return accountType.map((accountType) =>
      AccountTypeMapper.toResponseDto(accountType),
    );
  }
}
