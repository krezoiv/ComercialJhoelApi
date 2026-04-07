import { BaseEntity } from 'src/shared/domain/base-entity';
import { PasswordHash, UserId, Username } from '../../index-users-domain';
import { RolId, Rols } from 'src/lib/rols/domain/index-rols-domain';
import { PersonId, Persons } from 'src/lib/persons/domain/index-domain';

export class Users extends BaseEntity<UserId> {
  public userName: Username;
  public passwordHash: PasswordHash;
  public rolId: RolId;
  public rols?: Rols;
  public personId: PersonId;
  public persons?: Persons;

  constructor(
    id: UserId,
    rolId: RolId,
    personId: PersonId,
    userName: Username,
    passwordHash: PasswordHash,
    createdAt: Date,
    updateAt: Date,
    deletedAt?: Date | null,
    rols?: Rols,
    persons?: Persons,
  ) {
    super(id, createdAt, updateAt, deletedAt);
    this.userName = userName;
    this.passwordHash = passwordHash;
    this.rolId = rolId;
    this.rols = rols;
    this.personId = personId;
    this.persons = persons;
  }
}
