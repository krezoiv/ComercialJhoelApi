import { randomUUID } from 'crypto';
import {
  PasswordHash,
  UserId,
  Username,
  Users,
} from '../../index-users-domain';
import { CreateUsersInput } from '../../infrastructure/index-users-infrastructure';
import { PersonId } from 'src/lib/persons/domain/index-domain';
import { RolId } from 'src/lib/rols/domain/index-rols-domain';

export class UsersMapper {
  static toEntity(input: CreateUsersInput): Users {
    const id = new UserId(randomUUID());
    const rolId = new RolId(input.rolId);
    const personId = new PersonId(input.personId);
    const userName = new Username(input.userName);
    const passwordhash = new PasswordHash(input.passwordHash);

    const now = new Date();

    return new Users(
      id,
      rolId,
      personId,
      userName,
      passwordhash,
      now,
      now,
      null,
    );
  }
}
