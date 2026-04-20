import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountTypeCommand } from './create-account-type.command';
import { Inject } from '@nestjs/common';
import {
  ACCOUNT_TYPE_REPOSITORY,
  AccountTypeRepository,
} from '../../domain/index-account-type-domain';
import { AccountTypeMapper } from '../mappers/account-type.mapper';

@CommandHandler(CreateAccountTypeCommand)
export class CreateAccountTypeHandler implements ICommandHandler<CreateAccountTypeCommand> {
  constructor(
    @Inject(ACCOUNT_TYPE_REPOSITORY)
    private readonly _accountTypeRepository: AccountTypeRepository,
  ) {}

  async execute(command: CreateAccountTypeCommand) {
    const accountType = AccountTypeMapper.toEntity({
      accountTypeName: command.accountTypeName,
    });

    return this._accountTypeRepository.create(accountType);
  }
}
