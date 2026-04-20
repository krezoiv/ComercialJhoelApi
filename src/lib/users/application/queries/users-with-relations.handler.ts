import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UsersWithRelationsQuery } from './users-with-relations.query';
import { USERS_REPOSITORY, UsersRepository } from '../../index-users-domain';
import { Inject } from '@nestjs/common';

@QueryHandler(UsersWithRelationsQuery)
export class USersWithRelationsHandler implements IQueryHandler<UsersWithRelationsQuery> {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly _usersRepository: UsersRepository,
  ) {}

  async execute() {
    const users = await this._usersRepository.findAllUsersWithRelation();

    return users.map((row) => ({
      id: row.id,
      personId: row.personId,
      rolId: row.rolId,
      firstName: row.firstName,
      lastName: row.lastName,
      phoneNumber: row.phoneNumber,
      email: row.email,
      userName: row.username,
      rolName: row.rolName,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
    }));
  }
}
