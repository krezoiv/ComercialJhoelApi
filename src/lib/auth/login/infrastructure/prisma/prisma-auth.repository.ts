import { Injectable } from '@nestjs/common';
import { AuthRepositoty } from '../../domain/index-auth-domain';
import { LoginUserSp } from '../stored-procedure/login-user.sp';
import {
  PasswordHash,
  UserId,
  Username,
  Users,
} from 'src/lib/users/index-users-domain';
import {
  Email,
  PersonId,
  PhoneNumber,
} from 'src/lib/persons/domain/index-domain';
import {
  Description,
  RolId,
  RolName,
  Rols,
} from 'src/lib/rols/domain/index-rols-domain';
import {
  Persons,
  FirstName,
  LastName,
} from 'src/lib/persons/domain/index-domain';

@Injectable()
export class PrismaAuthRepository implements AuthRepositoty {
  constructor(private readonly _loginUserSp: LoginUserSp) {}
  async findByUserName(userName: string): Promise<Users> {
    const result = await this._loginUserSp.execute(userName);

    const data = result[0];
    console.log('ID:', data.id);
    console.log('ROLE ID:', data.rolId);
    console.log('PERSON ID:', data.personId);

    const rol = new Rols(
      new RolId(data.id),
      new RolName(data.rol),
      new Description(data.description),
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );

    const person = new Persons(
      new PersonId(data.personId),
      new FirstName(data.firstName),
      new LastName(data.lastName),
      new PhoneNumber(data.phoneNumber), // 👈 obligatorio
      new Email(data.email), // 👈 obligatorio
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.deletedAt ? new Date(data.deletedAt) : null,
    );

    return new Users(
      new UserId(String(data.id)),
      new RolId(data.rolId),
      new PersonId(data.personId),
      new Username(data.userName),
      new PasswordHash(data.passwordHash),
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.deletedAt ? new Date(data.deletedAt) : null,
      rol,
      person, // 👈 AQUÍ ESTÁ LA CLAVE
    );
  }
}
