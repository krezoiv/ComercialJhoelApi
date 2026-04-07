import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { CreateUsersCommand } from './create-users.command';
import { Inject } from '@nestjs/common';
import { USERS_REPOSITORY, UsersRepository } from '../../index-users-domain';
import { UsersMapper } from '../index-users-application';

@CommandHandler(CreateUsersCommand)
export class CreateUsersHandler implements ICommandHandler<CreateUsersCommand> {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly _usersRepository: UsersRepository,
  ) {}

  async execute(command: CreateUsersCommand) {
    console.log('rolId:', command.rolId);
    console.log('personId:', command.personId);
    const hashedPassword = await bcrypt.hash(command.password, 10);
    const user = UsersMapper.toEntity({
      rolId: command.rolId,
      personId: command.personId,
      userName: command.userName,
      passwordHash: hashedPassword,
    });

    return this._usersRepository.create(user);
  }
}
